import React from "react";
import {
  Container,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tr,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

type DecodedSignature = {
  r: string;
  s: string;
  v: number;
};

const SignatureOutput = ({
  signature,
  decodedSignature,
  isMobileTabletWidth,
}: {
  signature: string;
  decodedSignature: DecodedSignature;
  isMobileTabletWidth: boolean;
}) => {
  const truncatedR = isMobileTabletWidth
    ? `${decodedSignature.r.slice(0, 20)}...`
    : decodedSignature.r;

  const truncatedS = isMobileTabletWidth
    ? `${decodedSignature.s.slice(0, 20)}...`
    : decodedSignature.s;

  const toast = useToast();

  const copied = () => {
    toast({
      title: "Copied",
      status: "success",
      isClosable: true,
      position: "bottom",
    });
  };

  return (
    <Container maxW={"container.lg"} px={5}>
      <Text fontSize="xl" fontWeight="bold" mt={2}>
        Signature:
      </Text>
      <Tooltip label="copy" hasArrow placement="top">
        <Text
          cursor="pointer"
          onClick={() => {
            navigator.clipboard.writeText(signature);
            copied();
          }}
        >
          {signature}
        </Text>
      </Tooltip>

      <Table>
        <TableCaption placement="top">Decoded Signature</TableCaption>
        <Tbody>
          <Tr>
            <Td>r:</Td>
            <Td>
              {isMobileTabletWidth ? (
                <Tooltip label="copy" hasArrow placement="right">
                  <Text
                    as="span"
                    cursor="pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(decodedSignature.r);
                      copied();
                    }}
                  >
                    {truncatedR}
                  </Text>
                </Tooltip>
              ) : (
                truncatedR
              )}
            </Td>
          </Tr>
          <Tr>
            <Td>s:</Td>
            <Td>
              {isMobileTabletWidth ? (
                <Tooltip label="copy" hasArrow placement="right">
                  <Text
                    cursor="pointer"
                    as="span"
                    onClick={() => {
                      navigator.clipboard.writeText(decodedSignature.s);
                      copied();
                    }}
                  >
                    {truncatedS}
                  </Text>
                </Tooltip>
              ) : (
                truncatedS
              )}
            </Td>
          </Tr>
          <Tr>
            <Td>v:</Td>
            <Td>{decodedSignature.v}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};

export default SignatureOutput;
