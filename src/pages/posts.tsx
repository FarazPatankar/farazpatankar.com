import { Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { RichText, File, Date } from "@notionhq/client/build/src/api-types";

import { getDatabase } from "@lib/notion";
import { Text } from "@components/core/Text";

/**
 * It would be really nice if I could figure out how to
 * use the `Page` type from Notion and only extend the
 * properties block with a custom type
 */
interface Props {
  posts: {
    id: string;
    properties: {
      Title: any;
      Slug: RichText;
      Date: Date;
      Image: File;
    };
  }[];
}
const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <Box mb={8} w="full">
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <Text text={post.properties.Title.title} />
          </li>
        ))}
      </ol>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getDatabase(process.env.POSTS_TABLE_ID as string);

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};

export default Posts;
