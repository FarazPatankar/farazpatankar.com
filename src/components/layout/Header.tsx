import { Box, Flex, Heading, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import ThemeToggle from "./ThemeToggle";

interface Props {
  href: string;
}
const NavItem: React.FC<Props> = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <Link>{children}</Link>
    </NextLink>
  );
};

export const Header = () => {
  return (
    <Flex as="header" width="full" align="center" justify="space-between">
      <Heading as="h1" size="md">
        <NextLink href="/">farazpatankar</NextLink>
      </Heading>

      <Box>
        <HStack spacing="5">
          <NavItem href="/projects">Projects</NavItem>
          <Link href="/posts">Posts</Link>
          <ThemeToggle />
        </HStack>
      </Box>
    </Flex>
  );
};
