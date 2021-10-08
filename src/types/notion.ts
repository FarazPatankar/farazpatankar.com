import {
  Page,
  RichTextPropertyValue,
  DatePropertyValue,
  FilesPropertyValue,
} from "@notionhq/client/build/src/api-types";

interface PostProperties {
  Title: any;
  Slug: RichTextPropertyValue;
  Date: DatePropertyValue;
  Image: FilesPropertyValue;
}

/**
 * It would be really nice if I could figure out how to
 * use the `Page` type from Notion and only extend the
 * properties block with a custom type
 */
export interface PostProps extends Omit<Page, "properties"> {
  properties: PostProperties;
}
