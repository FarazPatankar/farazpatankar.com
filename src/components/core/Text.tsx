import { Text as ChakraText, Link } from "@chakra-ui/react";
import { Fragment } from "react";

/**
 * This type is harcoded here as I couldn't really find anything
 * in the Notion API that corresponds to the actual data
 */
interface TextProps {
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href: string | null;
  plain_text: string;
  text: {
    content: string;
    link: {
      url: string;
    } | null;
  };
  type: string;
}

export const Text: React.FC<{ text: TextProps[] | null }> = ({ text }) => {
  if (text == null) {
    return null;
  }

  return (
    <>
      {text.map((value, idx) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value;
        return (
          <Fragment key={idx}>
            {text.link ? (
              <Link
                href={text.link.url}
                color="purple.700"
                fontWeight={bold ? "bold" : "normal"}
                fontStyle={italic ? "italic" : "normal"}
                decoration={
                  strikethrough
                    ? "line-through"
                    : underline
                    ? "underline"
                    : "none"
                }
              >
                {text.content}
              </Link>
            ) : (
              <ChakraText
                as="span"
                fontWeight={bold ? "bold" : "normal"}
                fontStyle={italic ? "italic" : "normal"}
                color={color}
                decoration={
                  strikethrough
                    ? "line-through"
                    : underline
                    ? "underline"
                    : "none"
                }
              >
                {text.content}
              </ChakraText>
            )}
          </Fragment>
        );
      })}
    </>
  );
};
