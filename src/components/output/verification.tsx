"use client";

import React from "react";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";

const VerificationOutput = ({
  verifiedMessage,
  connectedAddress,
  recoveredAddress,
}: {
  verifiedMessage: string;
  connectedAddress: `0x${string}` | string;
  recoveredAddress: string;
}) => {
  const toast = useToast();
  const isMatch = verifiedMessage === "You are the signer";

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "bottom",
    });
  };

  return (
    <Box
      bg="#F8F9FA"
      border="1px solid #DADCE0"
      borderRadius="12px"
      p={{ base: 4, md: 5 }}
      mb={3}
    >
      {/* Status */}
      <Flex justify="center" mb={4}>
        <Flex
          align="center"
          gap={2}
          bg={isMatch ? "#E6F4EA" : "#FCE8E6"}
          borderRadius="full"
          px={4}
          py={2}
        >
          <Box
            w="6px"
            h="6px"
            borderRadius="full"
            bg={isMatch ? "#34A853" : "#EA4335"}
          />
          <Text
            fontSize="sm"
            fontWeight="500"
            color={isMatch ? "#137333" : "#C5221F"}
          >
            {verifiedMessage}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap={2}>
        <Box
          bg="white"
          borderRadius="8px"
          border="1px solid #E8EAED"
          p={3}
          cursor="pointer"
          transition="background 0.15s"
          _hover={{ bg: "#F8F9FA" }}
          onClick={() => copy(connectedAddress)}
        >
          <Text fontSize="xs" fontWeight="500" color="#5F6368" mb={1}>
            Connected Address
          </Text>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontFamily="mono"
            color="#202124"
            wordBreak="break-all"
          >
            {connectedAddress}
          </Text>
        </Box>

        <Box
          bg="white"
          borderRadius="8px"
          border="1px solid #E8EAED"
          p={3}
          cursor="pointer"
          transition="background 0.15s"
          _hover={{ bg: "#F8F9FA" }}
          onClick={() => copy(recoveredAddress)}
        >
          <Text fontSize="xs" fontWeight="500" color="#5F6368" mb={1}>
            Recovered Address
          </Text>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontFamily="mono"
            color={isMatch ? "#137333" : "#C5221F"}
            wordBreak="break-all"
          >
            {recoveredAddress}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default VerificationOutput;
