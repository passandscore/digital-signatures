"use client";

import React from "react";
import { Box, Flex, Text, useToast } from "@chakra-ui/react";

type DecodedSignature = {
  r: string;
  s: string;
  v: number;
};

const SignatureOutput = ({
  signature,
  decodedSignature,
}: {
  signature: string;
  decodedSignature: DecodedSignature;
}) => {
  const toast = useToast();

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
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="xs" fontWeight="500" color="#5F6368">
          Signature
        </Text>
        <Text
          fontSize="xs"
          color="#1A73E8"
          cursor="pointer"
          fontWeight="500"
          _hover={{ textDecoration: "underline" }}
          onClick={() => copy(signature)}
        >
          Copy
        </Text>
      </Flex>
      <Box
        bg="white"
        borderRadius="8px"
        border="1px solid #E8EAED"
        p={3}
        cursor="pointer"
        transition="background 0.15s"
        _hover={{ bg: "#F8F9FA" }}
        onClick={() => copy(signature)}
      >
        <Text
          fontSize="xs"
          fontFamily="mono"
          color="#5F6368"
          wordBreak="break-all"
          lineHeight="1.7"
        >
          {signature}
        </Text>
      </Box>

      <Text fontSize="xs" fontWeight="500" color="#5F6368" mt={4} mb={2}>
        Decoded
      </Text>

      <Flex direction="column" gap={2}>
        {[
          { label: "r", value: decodedSignature.r },
          { label: "s", value: decodedSignature.s },
          { label: "v", value: String(decodedSignature.v) },
        ].map((item) => (
          <Flex
            key={item.label}
            align="flex-start"
            bg="white"
            borderRadius="8px"
            border="1px solid #E8EAED"
            p={3}
            cursor="pointer"
            transition="background 0.15s"
            _hover={{ bg: "#F8F9FA" }}
            onClick={() => copy(item.value)}
          >
            <Text
              fontSize="xs"
              fontWeight="600"
              color="#1A73E8"
              minW="20px"
              fontFamily="mono"
            >
              {item.label}
            </Text>
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="#5F6368"
              wordBreak="break-all"
              lineHeight="1.6"
            >
              {item.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default SignatureOutput;
