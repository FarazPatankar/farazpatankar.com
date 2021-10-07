import { IconButton, useColorMode, Icon } from "@chakra-ui/react";
import { Sun, Moon } from "react-feather";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <Icon as={Moon} /> : <Icon as={Sun} />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
