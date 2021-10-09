import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Box, Heading, Stack, VStack } from "@chakra-ui/react";
import { Block } from "@notionhq/client/build/src/api-types";

import {
  getDatabase,
  mapDatabaseItemToPageProps,
  mapDatabaseToPaths,
} from "@lib/notion";
import { PostProps } from "@types/notion";

import Layout from "@components/layout";
import { NotionText } from "@components/core/NotionText";
import { RenderBlock } from "@components/core/NotionBlock";

const Post: React.FC<{ page: PostProps; blocks: Block[] }> = ({
  page,
  blocks,
}) => {
  return (
    <Layout seo={{ title: page.properties.Title.title[0].plain_text }}>
      <Box as="article">
        <VStack spacing="4" alignItems="start">
          <Heading>
            <NotionText text={page.properties.Title.title} />
          </Heading>
          <Box as="section">
            <Stack spacing="4">
              {blocks.map((block) => (
                <Fragment key={block.id}>
                  <RenderBlock block={block} />
                </Fragment>
              ))}
            </Stack>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getDatabase(process.env.POSTS_TABLE_ID as string);

  const paths = mapDatabaseToPaths(posts);
  return {
    paths,
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

  const props = await mapDatabaseItemToPageProps(post.id);
  return {
    props,
    revalidate: 1,
  };
};

export default Post;
