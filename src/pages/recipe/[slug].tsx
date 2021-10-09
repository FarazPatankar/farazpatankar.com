import { GetStaticPaths, GetStaticProps } from "next";
import { Block } from "@notionhq/client/build/src/api-types";

import {
  getDatabase,
  mapDatabaseItemToPageProps,
  mapDatabaseToPaths,
} from "@lib/notion";
import { PostProps } from "@customTypes/notion";

import { PostContent } from "@components/posts/PostContent";

const Recipe: React.FC<{ page: PostProps; blocks: Block[] }> = ({
  page,
  blocks,
}) => {
  return <PostContent page={page} blocks={blocks} />;
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
