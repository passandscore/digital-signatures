"use client";

import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createClient } from "wagmi";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, mainnet, goerli } from "@wagmi/core";
import { polygon, avalanche } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { appName } from "../../config";

const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

export const wagmiConfig = () => {
  const { chains, provider } = configureChains(
    [mainnet, goerli, avalanche, polygon],
    [
      infuraProvider({ apiKey: infuraApiKey } as {
        apiKey: string;
      }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName,
    chains,
  });

  const client = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return { client, chains };
};
