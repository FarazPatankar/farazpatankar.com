import { GetStaticProps } from "next";
import { Box } from "@chakra-ui/react";

import { getDatabase } from "@lib/notion";
import { PostProps } from "@types/notion";

import { NotionText } from "@components/core/NotionText";
import Layout from "@components/layout";
import { Link } from "@components/core/Link";

const Posts: React.FC<{ posts: PostProps[] }> = ({ posts }) => {
  return (
    <Layout seo={{ title: "Posts" }}>
      <Box mb={8} w="full">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/p/${post.properties.Slug.rich_text[0].plain_text}`}
          >
            <NotionText text={post.properties.Title.title} />
          </Link>
        ))}
      </Box>
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
