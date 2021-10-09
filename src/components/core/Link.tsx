import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  href: string;
  isExternal?: boolean;
}

export const Link: React.FC<Props & LinkProps> = ({
  href,
  isExternal,
  children,
  ...props
}) => {
  if (isExternal) {
    return (
      <ChakraLink
        href={href}
        isExternal={isExternal}
        color="purple.600"
        {...props}
      >
        {children}
      </ChakraLink>
    );
  }
  return (
    <NextLink href={href}>
      <ChakraLink color="purple.600" {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export const TitleLink: React.FC<Props & LinkProps> = ({
  href,
  isExternal,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
};
