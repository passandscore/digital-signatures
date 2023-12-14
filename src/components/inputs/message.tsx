"use client";

import { Flex, Textarea } from "@chakra-ui/react";

const MessageInput = ({ mode, setMessage, message }) => {
  return (
    <Flex mt={10} justify="center">
      <Textarea
        sx={{
          "::placeholder": {
            color: "gray.400",
          },
        }}
        placeholder={
          mode === "sign"
            ? "What message would you like to sign?"
            : "What message would you like to verify?"
        }
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        mb={2}
      />
    </Flex>
  );
};

export default MessageInput;
