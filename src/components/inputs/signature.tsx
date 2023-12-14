"use client";

import { Flex, Textarea } from "@chakra-ui/react";

const SignatureInput = ({
  setSignatureToVerify,
  signatureToVerify,
}: {
  setSignatureToVerify: (value: string) => void;
  signatureToVerify: string;
}) => {
  return (
    <Flex mt={10} mb={2} justify="center">
      <Textarea
        sx={{
          "::placeholder": {
            color: "gray.400",
          },
        }}
        placeholder="Provide the signature"
        onChange={(e) => setSignatureToVerify(e.target.value)}
        value={signatureToVerify}
        mb={2}
      />
    </Flex>
  );
};

export default SignatureInput;
