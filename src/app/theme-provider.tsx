"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"Fira Code", monospace',
  },
  styles: {
    global: {
      "::selection": {
        bg: "rgba(26, 115, 232, 0.15)",
      },
    },
  },
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={customTheme}>
        <Box
          bg="white"
          color="#202124"
          minH="100vh"
          display="flex"
          flexDir="column"
        >
          {children}
        </Box>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
