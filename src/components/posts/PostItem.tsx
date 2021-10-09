import dayjs from "dayjs";
import { Heading, VStack, Text } from "@chakra-ui/react";

import { PostProps } from "@customTypes/notion";

import { TitleLink } from "@components/core/Link";
import { NotionText } from "@components/core/NotionText";

interface Props {
  post: PostProps;
  resource: string;
}
export const PostItem: React.FC<Props> = ({ post, resource }) => {
  return (
    <VStack alignItems="start" spacing="2">
      <Heading>
        <TitleLink
          key={post.id}
          href={`/${resource}/${post.properties.Slug.rich_text[0].plain_text}`}
        >
          {post.properties.Title.title[0].plain_text}
        </TitleLink>
      </Heading>
      <VStack spacing="1" alignItems="start" maxW="xl">
        <NotionText text={post.properties.Description.rich_text} />
        {post.properties.Date.date && (
          <Text as="small" fontSize="sm" color="gray.600">
            {dayjs(post.properties.Date.date.start).format("MMM DD, YYYY")}
          </Text>
        )}
      </VStack>
    </VStack>
  );
};
