import { GetStaticPaths, GetStaticProps } from "next";

import { Block } from "@notionhq/client/build/src/api-types";

import {
  getDatabase,
  mapDatabaseItemToPageProps,
  mapDatabaseToPaths,
} from "@lib/notion";
import { PostProps } from "@customTypes/notion";

import { PostContent } from "@components/posts/PostContent";

const Post: React.FC<{ page: PostProps; blocks: Block[] }> = ({
  page,
  blocks,
}) => {
  return <PostContent page={page} blocks={blocks} />;
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
