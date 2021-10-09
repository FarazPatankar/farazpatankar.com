import { Box } from "@chakra-ui/react";
import { NextSeo, NextSeoProps } from "next-seo";

import { Footer } from "./Footer";
import { Header } from "./Header";

interface Props {
  seo?: NextSeoProps;
}
const Layout: React.FC<Props> = ({ seo, children }) => {
  return (
    <>
      <NextSeo {...seo} />
      <Box marginX="auto" maxWidth="3xl" transition="0.5s ease-out">
        <Box margin="8">
          <Header />
          <Box as="main" marginY="8">
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
