"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const trimAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const CustomConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <Button
        onClick={() => connect()}
        w="100%"
        h="44px"
        bg="white"
        border="1px solid #DADCE0"
        borderRadius="8px"
        color="#1A73E8"
        fontWeight="500"
        fontSize="sm"
        transition="all 0.15s"
        _hover={{
          bg: "#F8F9FA",
          borderColor: "#1A73E8",
        }}
        _active={{
          bg: "#E8F0FE",
        }}
      >
        Connect wallet
      </Button>
    );
  }

  return (
    <Flex
      w="100%"
      h="44px"
      align="center"
      justify="space-between"
      bg="#F8F9FA"
      border="1px solid #DADCE0"
      borderRadius="8px"
      px={4}
    >
      <Text fontSize="sm" fontFamily="mono" color="#5F6368">
        {address ? trimAddress(address) : ""}
      </Text>
      <Text
        fontSize="xs"
        color="#1A73E8"
        cursor="pointer"
        fontWeight="500"
        _hover={{ textDecoration: "underline" }}
        onClick={() => disconnect()}
      >
        Disconnect
      </Text>
    </Flex>
  );
};
