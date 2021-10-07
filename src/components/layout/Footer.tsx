import { Flex, Text, Icon } from "@chakra-ui/react";
import { Heart, Code } from "react-feather";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center" justify="center">
      <Text>
        Made with <Icon as={Heart} color="red" fill="red" /> and{" "}
        <Icon as={Code} />
      </Text>
    </Flex>
  );
};

export default Footer;
