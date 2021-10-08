import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Heading,
  Text as ChakraText,
  Stack,
  Image,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { Page, Block } from "@notionhq/client/build/src/api-types";
import {} from "@notionhq/client/build/src/index";

import { getBlocks, getDatabase, getPage } from "@lib/notion";
import { PostProps } from "@types/notion";

import { NotionText } from "@components/core/NotionText";
import Layout from "@components/layout";

const renderBlock = (block: Block) => {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph": {
      return (
        <ChakraText>
          <NotionText text={value.text} />
        </ChakraText>
      );
    }
    case "heading_1": {
      return (
        <Heading as="h1" size="2xl">
          <NotionText text={value.text} />
        </Heading>
      );
    }
    case "heading_2": {
      return (
        <Heading as="h2" size="xl">
          <NotionText text={value.text} />
        </Heading>
      );
    }
    case "heading_3": {
      return (
        <Heading as="h3" size="lg">
          <NotionText text={value.text} />
        </Heading>
      );
    }
    /**
     * Looks like v0.3.3 of @notionhq/client does not contain
     * the callout type. We aren't moving to 0.4+ because they've
     * broken some TS stuff in there.
     */

    // @ts-ignore
    case "callout": {
      return (
        <Alert rounded="lg">
          <AlertIcon />
          <AlertDescription fontSize="sm">
            <NotionText text={value.text} />
          </AlertDescription>
        </Alert>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item": {
      /**
       * Ideally, this should be using the <ListItem> component
       * but, it's past 1AM and it was throwing a weird error.
       */
      return (
        <Box as="li">
          <NotionText text={value.text} />
        </Box>
      );
    }
    case "image": {
      const source =
        value.type === "external" ? value.external.url : value.file.url;
      const caption =
        value.caption && value.caption.length > 0
          ? value.caption[0].plain_text
          : "";

      return (
        <Box as="figure">
          <Image src={source} alt={caption} />
          {caption && <ChakraText as="figcaption">{caption}</ChakraText>}
        </Box>
      );
    }
    default: {
      return (
        <ChakraText>
          ❌ Unsupported block{" "}
          {type === "unsupported" ? "unsupported by Notion API" : type})
        </ChakraText>
      );
    }
  }
};

const Post: React.FC<{ page: Page; blocks: Block[] }> = ({ page, blocks }) => {
  return (
    <Layout>
      <Box as="article">
        <Heading>
          <NotionText text={page.properties.Title.title} />
        </Heading>
        <Box as="section">
          <Stack spacing={5}>
            {blocks.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getDatabase(process.env.POSTS_TABLE_ID as string);

  return {
    paths: posts.map((page) => ({
      params: { slug: page.properties.Slug.rich_text[0].plain_text },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  if (params == null) {
    return {
      notFound: true,
    };
  }

  const posts = await getDatabase(process.env.POSTS_TABLE_ID as string);
  const slug = params.slug as string;
  const post = posts.find(
    (post) => post.properties.Slug.rich_text[0].plain_text === slug
  );
  if (post == null) {
    return {
      notFound: true,
    };
  }

  const page = await getPage(post.id);
  console.log("page", page);
  const blocks = await getBlocks(post.id);

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (childBlock) => (childBlock.id = block.id)
      )?.children;
    }

    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};

export default Post;
