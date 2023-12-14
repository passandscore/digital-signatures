"use client";
import {
  Flex,
  Text,
  Button,
  Container,
  HStack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { Fragment, useState } from "react";
import { ethers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SignatureOutput from "../output/signature";
import VerificationOutput from "../output/verification";
import MessageInput from "../inputs/message";
import SignatureInput from "../inputs/signature";

type DecodedSignature = {
  r: string;
  s: string;
  v: number;
};

const SignMessage: NextPage = () => {
  const [mode, setMode] = useState<"sign" | "verify">("sign");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [signerAddress, setSignerAddress] = useState("");
  const [verifiedMessage, setVerifiedMessage] = useState("");
  const [signatureToVerify, setSignatureToVerify] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [decodedSignature, setDecodedSignature] = useState({
    r: "",
    s: "",
    v: 0,
  } as DecodedSignature);

  const account = useAccount();
  const toast = useToast();

  const notification = (message: string, type: string) => {
    toast[type](message, {
      theme: "colored",
      position: "bottom-right",
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const sign = async () => {
    const walletConnected = account?.address;

    if (!walletConnected) {
      toast({
        title: "Please connect your wallet",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (!message) {
      toast({
        title: "Invalid message",
        status: "error",
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      if (walletConnected) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as ExternalProvider
        );
        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);

        const decodedSignature = ethers.utils.splitSignature(signature);
        const { v, r, s } = decodedSignature;

        setDecodedSignature({ v, r, s });
        setSignature(signature);
      } else {
        notification("Please connect your wallet to sign message", "error");
      }
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
          position: "top",
        });
        return;
      }

      if (walletConnected) {
        const signerAddr = ethers.utils.verifyMessage(
          message,
          signatureToVerify
        );
        setSignerAddress(signerAddr);

        if (signerAddr !== account?.address) {
          setVerifiedMessage("❌ You are not the signer of this message");
        } else {
          setVerifiedMessage("🎉 You are the signer of this message");
        }
      } else {
        setVerifiedMessage("❌ Please connect your wallet to verify message");
      }

      setIsVerified(true);
    } catch (err) {
      console.log(err);

      if (!signatureToVerify || !message) {
        toast({
          title: "Invalid signature or message",
          status: "error",
          isClosable: true,
          position: "top",
        });
      }

      if (err.message.includes("signature missing")) {
        toast({
          title: "Invalid signature",
          status: "error",
          isClosable: true,
          position: "top",
        });
      }

      return false;
    }
  };

  const clearState = () => {
    setMessage("");
    setSignature("");
    setSignerAddress("");
    setSignatureToVerify("");
    setIsVerified(false);
  };

  return (
    <Fragment>
      <Container mt={5} mb={10} maxW="87%">
        <Flex justify="space-between">
          <ConnectButton />
          <HStack spacing={5}>
            <Text>Sign</Text>

            <Switch
              size="lg"
              onChange={() => {
                clearState();
                setMode(mode === "sign" ? "verify" : "sign");
              }}
            />
            <Text>Verify</Text>
          </HStack>
        </Flex>

        <MessageInput mode={mode} setMessage={setMessage} message={message} />

        {mode === "verify" && (
          <SignatureInput
            setSignatureToVerify={setSignatureToVerify}
            signatureToVerify={signatureToVerify}
          />
        )}

        <Flex justify="flex-end" mt={3}>
          <Flex justify="flex-end" alignItems="center" mr={2}>
            <Text
              fontSize="sm"
              color="red"
              textAlign="center"
              cursor="pointer"
              onClick={() => {
                clearState();
              }}
            >
              RESET
            </Text>
          </Flex>

          <Button
            size={"sm"}
            w={20}
            onClick={() => {
              mode === "sign" ? sign() : verify();
            }}
          >
            {mode === "sign" ? "Sign" : "Verify"}
          </Button>
        </Flex>
      </Container>

      {/* outputs */}
      {signature && mode === "sign" && (
        <SignatureOutput
          signature={signature}
          decodedSignature={decodedSignature}
        />
      )}

      {signatureToVerify && isVerified && mode === "verify" && (
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
