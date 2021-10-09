import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import fonts from "./fonts";

const customTheme = extendTheme({
  fonts,
  colors,
});

export default customTheme;
