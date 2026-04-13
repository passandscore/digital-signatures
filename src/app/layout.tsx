"use client";
import { Inter } from "next/font/google";

import ThemeProvider from "./theme-provider";
import { wagmiConfig } from "./wagmi-config";

import { WagmiConfig } from "wagmi";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { client } = wagmiConfig();
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig client={client}>
          <ThemeProvider>{children}</ThemeProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
