"use client";

import { Box, Flex } from "@chakra-ui/react";
import SignMessage from "src/components/sign";

const Page = () => {
  return (
    <Flex
      flex={1}
      justify="center"
      align="flex-start"
      px={{ base: 4, md: 6 }}
      py={{ base: 6, md: 10 }}
    >
      <Box w="100%" maxW="600px">
        <SignMessage />
      </Box>
    </Flex>
  );
};

export default Page;
