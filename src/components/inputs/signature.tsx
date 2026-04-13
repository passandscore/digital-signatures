"use client";

import { Box, Text, Textarea } from "@chakra-ui/react";

const SignatureInput = ({
  setSignatureToVerify,
  signatureToVerify,
}: {
  setSignatureToVerify: (value: string) => void;
  signatureToVerify: string;
}) => {
  return (
    <Box>
      <Text fontSize="xs" fontWeight="500" color="#5F6368" mb={2}>
        Signature
      </Text>
      <Textarea
        placeholder="Paste the signature to verify..."
        onChange={(e) => setSignatureToVerify(e.target.value)}
        value={signatureToVerify}
        bg="white"
        border="1px solid #DADCE0"
        borderRadius="8px"
        color="#202124"
        fontSize="sm"
        fontFamily="mono"
        px={4}
        py={3}
        minH="80px"
        resize="vertical"
        transition="all 0.15s"
        _placeholder={{
          color: "#9AA0A6",
          fontSize: "sm",
          fontFamily: "body",
        }}
        _hover={{
          borderColor: "#BDC1C6",
        }}
        _focus={{
          borderColor: "#1A73E8",
          boxShadow: "none",
        }}
      />
    </Box>
  );
};

export default SignatureInput;
