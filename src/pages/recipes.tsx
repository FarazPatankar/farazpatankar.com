import { GetStaticProps } from "next";
import { Box } from "@chakra-ui/react";

import { getDatabase } from "@lib/notion";
import { PostProps } from "@types/notion";

import { NotionText } from "@components/core/NotionText";
import Layout from "@components/layout";

const Recipes: React.FC<{ recipes: PostProps[] }> = ({ recipes }) => {
  return (
    <Layout seo={{ title: "Recipes" }}>
      <Box mb={8} w="full">
        <ol>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <NotionText text={recipe.properties.Title.title} />
            </li>
          ))}
        </ol>
      </Box>
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
