"use client";

import {
  Container,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

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
  return (
    <Container maxW={"container.lg"} px={5}>
      <Text fontSize="xl" fontWeight="bold" mt={2}>
        Signature:
      </Text>
      <Text>{signature}</Text>

      <Table>
        <TableCaption placement="top">Decoded Signature</TableCaption>
        <Tbody>
          <Tr>
            <Td>r:</Td>
            <Td>{decodedSignature.r}</Td>
          </Tr>
          <Tr>
            <Td>s:</Td>
            <Td>{decodedSignature.s}</Td>
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
