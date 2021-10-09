import { Box, chakra, BoxProps } from "@chakra-ui/react";
import NextImage, { ImageProps, ImageLoaderProps } from "next/image";

const ChakraImage = chakra(NextImage, {
  shouldForwardProp: (prop) => ["src", "alt", "quality"].includes(prop),
});

export const Image = (props: ImageProps & BoxProps) => {
  const { src, alt, width, quality, height, layout, ...rest } = props;
  return (
    <Box pos="relative" cursor="pointer" {...rest}>
      <ChakraImage
        quality={quality}
        layout="fill"
        src={src}
        alt={alt}
        transition="all 0.2s"
      />
    </Box>
  );
};
