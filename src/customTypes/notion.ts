import {
  Page,
  TitlePropertyValue,
  RichTextPropertyValue,
  DatePropertyValue,
  FilesPropertyValue,
  URLPropertyValue,
} from "@notionhq/client/build/src/api-types";

interface PostProperties {
  Title: TitlePropertyValue;
  Slug: RichTextPropertyValue;
  Date: DatePropertyValue;
  Image: FilesPropertyValue;
  Description: RichTextPropertyValue;
  Url?: URLPropertyValue;
}

/**
 * It would be really nice if I could figure out how to
 * use the `Page` type from Notion and only extend the
 * properties block with a custom type
 */
export interface PostProps extends Omit<Page, "properties"> {
  properties: PostProperties;
}
