import { Center, Flex } from "@chakra-ui/react";
import Image from "next/image";

const Preloader = () => {
  return (
    <Center h="75vh">
      <Flex direction="column" align="center" justify="center">
        <h1
          style={{
            fontSize: "2rem",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Digital Signatures
        </h1>
        <h2
          style={{
            fontSize: "1.2rem",
            color: "#4299E1",
            fontWeight: "bold",
          }}
        >
          Signing & Verifying
        </h2>

        <Image
          src="/preloader.gif"
          alt="preloader"
          priority
          width={100}
          height={25}
        />
      </Flex>
    </Center>
  );
};

export default Preloader;
