import React from "react";
import {
  Container,
  Table,
  Tbody,
  Td,
  Tooltip,
  Tr,
  Text,
  useToast,
} from "@chakra-ui/react";

const trimAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const VerificationOutput = ({
  verifiedMessage,
  connectedAddress,
  recoveredAddress,
  isMobileTabletWidth,
}: {
  verifiedMessage: string;
  connectedAddress: `0x${string}` | string;
  recoveredAddress: string;
  isMobileTabletWidth: boolean;
}) => {
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
    <Container maxW={"container.lg"} px={5} mb={10}>
      <Text color="#4299E1" fontSize="lg" my={2} align="center">
        {verifiedMessage}
      </Text>
      <Table>
        <Tbody>
          <Tr>
            <Td>{`${
              isMobileTabletWidth ? "Connected" : "Connected Address:"
            }`}</Td>

            <Td>
              <Tooltip label="copy" hasArrow>
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(connectedAddress);
                    copied();
                  }}
                  cursor="pointer"
                >
                  {isMobileTabletWidth
                    ? trimAddress(connectedAddress)
                    : connectedAddress}
                </Text>
              </Tooltip>
            </Td>
          </Tr>
          <Tr>
            <Td>{`${
              isMobileTabletWidth ? "Recovered" : "Recovered Address:"
            }`}</Td>
            <Td>
              <Tooltip label="copy" hasArrow>
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(recoveredAddress);
                    copied();
                  }}
                  cursor="pointer"
                >
                  {isMobileTabletWidth
                    ? trimAddress(recoveredAddress)
                    : recoveredAddress}
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
