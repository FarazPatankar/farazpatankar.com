import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" justify="space-between">
      <Heading as="h1" size="md">
        <Link href="/">farazpatankar</Link>
      </Heading>

      <Box>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
