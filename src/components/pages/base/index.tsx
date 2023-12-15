"use client";

import { Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "src/components/header";
import SignMessage from "src/components/sign";
import Preloader from "src/components/title/preloader";

const Page = () => {
  const [preloaded, setPreloaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPreloaded(true);
    }, 2000);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>

      {!preloaded ? (
        <Preloader />
      ) : (
        <Center>
          <Box
            mt={10}
            px={5}
            maxW="1300px"
            w="100%"
            style={{
              animation: preloaded ? "fadeIn 1s ease-in-out" : "none",
            }}
          >
            <Header />
            <SignMessage />
          </Box>
        </Center>
      )}
    </>
  );
};

export default Page;
