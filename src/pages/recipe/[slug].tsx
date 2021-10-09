import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  Box,
  Heading,
  Stack,
  VStack,
  Image as ChakraImage,
} from "@chakra-ui/react";
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

const Recipe: React.FC<{ page: PostProps; blocks: Block[] }> = ({
  page,
  blocks,
}) => {
  const image = page.properties.Image.files[0];
  return (
    <Layout seo={{ title: page.properties.Title.title[0].plain_text }}>
      <Box as="article">
        <VStack spacing="4" alignItems="start">
          {image && (
            <ChakraImage
              src={image.file.url}
              alt={image.name}
              height="md"
              width="sm"
              marginX="auto"
            />
          )}
          <Heading pt="4">
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
  const recipes = await getDatabase(process.env.RECIPES_TABLE_ID as string);

  const paths = mapDatabaseToPaths(recipes);
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

  const recipes = await getDatabase(process.env.RECIPES_TABLE_ID as string);
  const slug = params.slug as string;
  const recipe = recipes.find(
    (recipe) => recipe.properties.Slug.rich_text[0].plain_text === slug
  );
  if (recipe == null) {
    return {
      notFound: true,
    };
  }

  const props = await mapDatabaseItemToPageProps(recipe.id);
  return {
    props,
    revalidate: 1,
  };
};

export default Recipe;
