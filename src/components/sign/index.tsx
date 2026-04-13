"use client";
import { Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { Fragment, useState } from "react";
import { ethers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";
import { useAccount } from "wagmi";

import SignatureOutput from "../output/signature";
import VerificationOutput from "../output/verification";
import MessageInput from "../inputs/message";
import SignatureInput from "../inputs/signature";
import { CustomConnectButton } from "../buttons/rainbow-connect";

type DecodedSignature = {
  r: string;
  s: string;
  v: number;
};

const SignMessage: NextPage = () => {
  const [mode, setMode] = useState<"sign" | "verify">("sign");

  // Sign state
  const [signMessage, setSignMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [decodedSignature, setDecodedSignature] = useState<DecodedSignature>({
    r: "",
    s: "",
    v: 0,
  });

  // Verify state
  const [verifyMessage, setVerifyMessage] = useState("");
  const [signatureToVerify, setSignatureToVerify] = useState("");
  const [signerAddress, setSignerAddress] = useState("");
  const [verifiedMessage, setVerifiedMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const account = useAccount();
  const toast = useToast();

  const message = mode === "sign" ? signMessage : verifyMessage;
  const setMessage = mode === "sign" ? setSignMessage : setVerifyMessage;

  const sign = async () => {
    const walletConnected = account?.address;

    if (!walletConnected) {
      toast({
        title: "Please connect your wallet",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (!signMessage) {
      toast({
        title: "Enter a message to sign",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as ExternalProvider
      );
      const signer = provider.getSigner();
      const sig = await signer.signMessage(signMessage);

      const decoded = ethers.utils.splitSignature(sig);
      setDecodedSignature({ v: decoded.v, r: decoded.r, s: decoded.s });
      setSignature(sig);
    } catch (err) {
      console.log(err);
    }
  };

  const verify = async () => {
    try {
      const walletConnected = account?.address;

      if (!walletConnected) {
        toast({
          title: "Please connect your wallet",
          status: "error",
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      if (!signatureToVerify || !verifyMessage) {
        toast({
          title: "Provide both message and signature",
          status: "error",
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      const signerAddr = ethers.utils.verifyMessage(
        verifyMessage,
        signatureToVerify
      );
      setSignerAddress(signerAddr);
      setVerifiedMessage(
        signerAddr === account?.address
          ? "You are the signer"
          : "You are not the signer"
      );
      setIsVerified(true);
    } catch (err) {
      console.log(err);
      if (err.message.includes("signature missing")) {
        toast({
          title: "Invalid signature",
          status: "error",
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const clearState = () => {
    if (mode === "sign") {
      setSignMessage("");
      setSignature("");
      setDecodedSignature({ r: "", s: "", v: 0 });
    } else {
      setVerifyMessage("");
      setSignatureToVerify("");
      setSignerAddress("");
      setVerifiedMessage("");
      setIsVerified(false);
    }
  };

  return (
    <Fragment>
      {/* Title */}
      <Flex direction="column" align="center" mb={{ base: 6, md: 8 }}>
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="400"
          color="#202124"
          letterSpacing="-0.02em"
        >
          Digital Signatures
        </Text>
        <Text fontSize="sm" color="#5F6368" fontWeight="400" mt={1}>
          Sign and verify messages with your wallet
        </Text>
      </Flex>

      {/* Mode Toggle */}
      <Flex
        bg="#F1F3F4"
        borderRadius="8px"
        p="3px"
        mb={{ base: 4, md: 5 }}
      >
        <Button
          flex={1}
          size="sm"
          h="36px"
          borderRadius="6px"
          bg={mode === "sign" ? "white" : "transparent"}
          color={mode === "sign" ? "#202124" : "#5F6368"}
          fontWeight="500"
          fontSize="sm"
          boxShadow={mode === "sign" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"}
          _hover={{
            bg: mode === "sign" ? "white" : "#E8EAED",
          }}
          _active={{
            bg: mode === "sign" ? "white" : "#DADCE0",
          }}
          transition="all 0.15s"
          onClick={() => mode !== "sign" && setMode("sign")}
        >
          Sign
        </Button>
        <Button
          flex={1}
          size="sm"
          h="36px"
          borderRadius="6px"
          bg={mode === "verify" ? "white" : "transparent"}
          color={mode === "verify" ? "#202124" : "#5F6368"}
          fontWeight="500"
          fontSize="sm"
          boxShadow={
            mode === "verify" ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
          }
          _hover={{
            bg: mode === "verify" ? "white" : "#E8EAED",
          }}
          _active={{
            bg: mode === "verify" ? "white" : "#DADCE0",
          }}
          transition="all 0.15s"
          onClick={() => mode !== "verify" && setMode("verify")}
        >
          Verify
        </Button>
      </Flex>

      {/* Main Card */}
      <Box
        bg="white"
        border="1px solid #DADCE0"
        borderRadius="12px"
        p={{ base: 4, md: 5 }}
        mb={3}
      >
        <Box mb={4}>
          <CustomConnectButton />
        </Box>

        <MessageInput mode={mode} setMessage={setMessage} message={message} />

        {mode === "verify" && (
          <Box mt={3}>
            <SignatureInput
              setSignatureToVerify={setSignatureToVerify}
              signatureToVerify={signatureToVerify}
            />
          </Box>
        )}

        <Flex justify="space-between" align="center" mt={4}>
          <Text
            fontSize="xs"
            color="#5F6368"
            cursor="pointer"
            fontWeight="500"
            transition="color 0.15s"
            _hover={{ color: "#202124" }}
            onClick={clearState}
          >
            Reset
          </Text>

          <Button
            h="36px"
            px={6}
            bg="#1A73E8"
            color="white"
            borderRadius="6px"
            fontWeight="500"
            fontSize="sm"
            _hover={{ bg: "#1765CC" }}
            _active={{ bg: "#185ABC" }}
            transition="all 0.15s"
            onClick={() => (mode === "sign" ? sign() : verify())}
          >
            {mode === "sign" ? "Sign" : "Verify"}
          </Button>
        </Flex>
      </Box>

      {/* Outputs — always rendered when data exists, regardless of mode */}
      {signature && (
        <SignatureOutput
          signature={signature}
          decodedSignature={decodedSignature}
        />
      )}

      {signatureToVerify && isVerified && (
        <VerificationOutput
          verifiedMessage={verifiedMessage}
          connectedAddress={account?.address || ""}
          recoveredAddress={signerAddress}
        />
      )}
    </Fragment>
  );
};

export default SignMessage;
