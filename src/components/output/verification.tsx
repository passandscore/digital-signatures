"use client";

import {
  Center,
  Container,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tooltip,
  Tr,
  Text,
  useClipboard,
} from "@chakra-ui/react";

const VerificationOutput = ({
  verifiedMessage,
  connectedAddress,
  recoveredAddress,
}: {
  verifiedMessage: string;
  connectedAddress: `0x${string}` | string;
  recoveredAddress: string;
}) => {
  const { onCopy: onCopyConnectedAddress } = useClipboard(
    `0x${connectedAddress}` as string
  );
  const { onCopy: onCopyRecoveredAddress } = useClipboard(recoveredAddress);

  return (
    <Container maxW={"container.lg"} px={5} mb={10}>
      <Center fontSize="xl" fontWeight="bold" mt={2}>
        {verifiedMessage}
      </Center>
      <Table>
        <TableCaption placement="top">Recovered Results</TableCaption>
        <Tbody>
          <Tr>
            <Td>Connected Address:</Td>
            <Td>
              <Tooltip label={connectedAddress} hasArrow>
                <Text onClick={onCopyConnectedAddress} cursor="pointer">
                  {connectedAddress}
                </Text>
              </Tooltip>
            </Td>
          </Tr>
          <Tr>
            <Td>Recovered Address:</Td>
            <Td>
              <Tooltip label={recoveredAddress} hasArrow>
                <Text onClick={onCopyRecoveredAddress} cursor="pointer">
                  {recoveredAddress}
                </Text>
              </Tooltip>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};

export default VerificationOutput;
