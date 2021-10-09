import { Fragment } from "react";
import { Box, Heading, Stack, VStack } from "@chakra-ui/react";
import { Block } from "@notionhq/client/build/src/api-types";

import { PostProps } from "@customTypes/notion";

import Layout from "@components/layout";
import { NotionText } from "@components/core/NotionText";
import { RenderBlock } from "@components/core/NotionBlock";

interface Props {
  page: PostProps;
  blocks: Block[];
}
export const PostContent: React.FC<Props> = ({ page, blocks }) => {
  if (page == null || blocks == null) {
    return null;
  }

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
