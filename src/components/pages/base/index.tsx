"use client";

import { Box } from "@chakra-ui/react";

import Header from "src/components/header";
import SignMessage from "src/components/sign";

const Page = () => {
  return (
    <Box mt={10} px={5}>
      <Header />
      <SignMessage />
    </Box>
  );
};

export default Page;
