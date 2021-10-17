import { Box } from "@chakra-ui/react";
import { Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

import { CodeContainer } from "./CodeContainer";
import { Highlight } from "./Highlight";

interface Props {
  language: Language;
  code: string;
  showLines?: boolean;
  linesToHighlight?: string;
}
export const CodeBlock: React.FC<Props> = ({
  language,
  code,
  showLines,
  linesToHighlight,
}) => {
  return (
    <Box position="relative" zIndex="0">
      <CodeContainer px="0" overflow="hidden">
        <Highlight
          language={language}
          codeString={code}
          theme={theme}
          showLines={showLines}
          linesToHighlight={linesToHighlight}
        />
      </CodeContainer>
    </Box>
  );
};
