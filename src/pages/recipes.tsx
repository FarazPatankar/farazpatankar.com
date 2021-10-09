import { GetStaticProps } from "next";
import { VStack } from "@chakra-ui/react";

import { getDatabase } from "@lib/notion";
import { PostProps } from "@customTypes/notion";

import Layout from "@components/layout";
import { PostItem } from "@components/posts/PostItem";

const Recipes: React.FC<{ recipes: PostProps[] }> = ({ recipes }) => {
  return (
    <Layout
      seo={{
        title: "Recipes",
        description:
          "(Hopefully) a not-so-tiny collection of recipes I find myself cooking every so often.",
      }}
    >
      <VStack mb={8} w="full" alignItems="start" spacing="8">
        {recipes.map((recipe) => (
          <PostItem key={recipe.id} post={recipe} resource="recipe" />
        ))}
      </VStack>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getDatabase(process.env.RECIPES_TABLE_ID as string);

  return {
    props: {
      recipes,
    },
    revalidate: 1,
  };
};

export default Recipes;
