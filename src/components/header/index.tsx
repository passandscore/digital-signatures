import { Flex, Text, Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Flex
        mt={10}
        mx="auto"
        maxW="7xl"
        fontSize="3xl"
        fontWeight="bold"
        color="white"
        justify="space-between"
        align="center"
      >
        <Text>Digital Signatures</Text>
        <Flex align="center">
          {/* Star Repo Button */}
          <Button
            size="sm"
            variant={"outline"}
            onClick={() => {
              window.open(
                "https://github.com/passandscore/digital-signatures",
                "_blank"
              );
            }}
            fontSize="xs"
            ml={2}
          >
            Star Repository
          </Button>
        </Flex>
      </Flex>

      <Flex
        mx="auto"
        maxW="7xl"
        borderBottom="1px"
        pb={4}
        fontSize="lg"
        justify="space-between"
      >
        <Text color="#4299E1">Signing & Verifying</Text>
      </Flex>
    </>
  );
};

export default Header;
