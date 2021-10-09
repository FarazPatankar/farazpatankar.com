import { GetStaticProps } from "next";
import { VStack } from "@chakra-ui/react";

import { getDatabase } from "@lib/notion";
import { PostProps } from "@customTypes/notion";

import Layout from "@components/layout";
import { PostItem } from "@components/posts/PostItem";

const Posts: React.FC<{ posts: PostProps[] }> = ({ posts }) => {
  return (
    <Layout
      seo={{
        title: "Posts",
        description:
          "A limited collection of posts I've someone managed to make myself publish.",
      }}
    >
      <VStack mb={8} w="full" alignItems="start" spacing="8">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} resource="post" />
        ))}
      </VStack>
    </Layout>
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
