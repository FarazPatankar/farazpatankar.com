import { chakra } from "@chakra-ui/react";
import BaseHighlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer";

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta?: string) => {
  if (meta == null || !RE.test(meta)) {
    return () => false;
  }

  const result = RE.exec(meta);
  if (result == null) {
    return () => false;
  }
  const lineNumbers = result[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

interface Props {
  codeString: string;
  showLines?: boolean;
  language: Language;
  theme: PrismTheme;
  linesToHighlight?: string;
}
export const Highlight = ({
  codeString,
  language,
  linesToHighlight,
  showLines,
  ...props
}: Props) => {
  const shouldHighlightLine = calculateLinesToHighlight(linesToHighlight);

  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          style={{
            fontSize: 14,
            overflowX: "auto",
            fontFamily: "SF Mono, Menlo, monospace",
          }}
          data-language={language}
        >
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <chakra.div
                  key={i}
                  px="5"
                  bg={shouldHighlightLine(i) ? "whiteAlpha.200" : undefined}
                  {...lineProps}
                >
                  {showLines && (
                    <chakra.span opacity={0.3} mr="6" fontSize="xs">
                      {i + 1}
                    </chakra.span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </chakra.div>
              );
            })}
          </pre>
        </div>
      )}
    </BaseHighlight>
  );
};
