import { Client } from "@notionhq/client";
import { PostProps } from "@customTypes/notion";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results as unknown as PostProps[];
};

export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });

  return response as unknown as PostProps;
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

export const mapDatabaseToPaths = (database: PostProps[]) => {
  return database.map((item) => {
    return { params: { slug: item.properties.Slug.rich_text[0].plain_text } };
  });
};

export const mapDatabaseItemToPageProps = async (id: string) => {
  const page = await getPage(id);
  const blocks = await getBlocks(id);

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
    // @ts-ignore
    if (block.has_children && !block[block.type].children) {
      // @ts-ignore
      block[block.type]["children"] = childBlocks.find(
        (childBlock) => (childBlock.id = block.id)
      )?.children;
    }

    return block;
  });

  return { page, blocks: blocksWithChildren };
};
