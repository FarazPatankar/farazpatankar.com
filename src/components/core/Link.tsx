import { Link as ChakraLink } from "@chakra-ui/layout";
import NextLink from "next/link";

interface Props {
  href: string;
  isExternal?: boolean;
}

export const Link: React.FC<Props> = ({ href, isExternal, children }) => {
  if (isExternal) {
    return (
      <ChakraLink href={href} isExternal={isExternal} color="purple.600">
        {children}
      </ChakraLink>
    );
  }
  return (
    <NextLink href={href}>
      <ChakraLink color="purple.600">{children}</ChakraLink>
    </NextLink>
  );
};
