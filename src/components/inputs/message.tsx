"use client";

import { Box, Text, Textarea } from "@chakra-ui/react";

const MessageInput = ({ mode, setMessage, message }) => {
  return (
    <Box>
      <Text fontSize="xs" fontWeight="500" color="#5F6368" mb={2}>
        Message
      </Text>
      <Textarea
        placeholder={
          mode === "sign"
            ? "Enter the message you want to sign..."
            : "Enter the message to verify against..."
        }
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        bg="white"
        border="1px solid #DADCE0"
        borderRadius="8px"
        color="#202124"
        fontSize="sm"
        px={4}
        py={3}
        minH="100px"
        resize="vertical"
        transition="all 0.15s"
        _placeholder={{
          color: "#9AA0A6",
          fontSize: "sm",
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

export default MessageInput;
