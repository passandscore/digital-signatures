"use client";
import { Inter } from "next/font/google";

import ThemeProvider from "./theme-provider";
import { wagmiConfig } from "./wagmi-config";

import Navbar from "components/navbar/index";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { client, chains } = wagmiConfig();
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig client={client}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              accentColor: "#4F535C",
              accentColorForeground: "white",
              borderRadius: "small",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            <ThemeProvider>
              <Navbar />
              {children}
            </ThemeProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
