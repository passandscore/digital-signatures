"use client";

import { Box, Center } from "@chakra-ui/react";

import Header from "src/components/header";
import SignMessage from "src/components/sign";

const Page = () => {
  return (
    <Center>
      <Box mt={10} px={5} maxW="1300px" w="100%">
        <Header />
        <SignMessage />
      </Box>
    </Center>
  );
};

export default Page;
