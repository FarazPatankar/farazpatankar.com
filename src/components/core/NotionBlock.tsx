import { Block } from "@notionhq/client/build/src/api-types";
import {
  Box,
  Heading,
  Text as ChakraText,
  Image,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

import { NotionText } from "@components/core/NotionText";
import { CodeBlock } from "@components/core/code-block";

interface Props {
  block: Block;
}
export const RenderBlock: React.FC<Props> = ({ block }) => {
  const { type, id } = block;
  // @ts-ignore
  const value = block[type];

  switch (type) {
    case "paragraph": {
      return (
        <ChakraText>
          <NotionText text={value.text} />
        </ChakraText>
      );
    }
    case "heading_1": {
      return (
        <Heading as="h1" size="3xl">
          <NotionText text={value.text} />
        </Heading>
      );
    }
    case "heading_2": {
      return (
        <Heading as="h2" fontSize="2xl" paddingTop="8">
          <NotionText text={value.text} />
        </Heading>
      );
    }
    case "heading_3": {
      return (
        <Heading as="h3" size="lg">
          <NotionText text={value.text} />
        </Heading>
      );
    }
    /**
     * Looks like v0.3.3 of @notionhq/client does not contain
     * the callout type. We aren't moving to 0.4+ because they've
     * broken some TS stuff in there.
     */

    // @ts-ignore
    case "callout": {
      return (
        <Alert rounded="lg">
          <AlertIcon />
          <AlertDescription fontSize="sm">
            <NotionText text={value.text} />
          </AlertDescription>
        </Alert>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item": {
      /**
       * Ideally, this should be using the <ListItem> component
       * but, it's past 1AM and it was throwing a weird error.
       */
      return (
        <Box as="li">
          <NotionText text={value.text} />
        </Box>
      );
    }
    case "image": {
      const source =
        value.type === "external" ? value.external.url : value.file.url;
      const caption =
        value.caption && value.caption.length > 0
          ? value.caption[0].plain_text
          : "";

      return (
        <Box as="figure">
          <Image src={source} alt={caption} />
          {caption && <ChakraText as="figcaption">{caption}</ChakraText>}
        </Box>
      );
    }
    // @ts-ignore: Current client version does not support `code` but API does
    case "code": {
      return (
        <CodeBlock language="tsx" code={value.text[0].plain_text} showLines />
      );
    }
    default: {
      return (
        <ChakraText>
          ❌ Unsupported block{" "}
          {type === "unsupported" ? "unsupported by Notion API" : type})
        </ChakraText>
      );
    }
  }
};
