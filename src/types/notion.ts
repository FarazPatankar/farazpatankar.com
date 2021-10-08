import { RichText, File, Date } from "@notionhq/client/build/src/api-types";

/**
 * It would be really nice if I could figure out how to
 * use the `Page` type from Notion and only extend the
 * properties block with a custom type
 */
export interface PostProps {
  id: string;
  properties: {
    Title: any;
    Slug: RichText;
    Date: Date;
    Image: File;
  };
}
