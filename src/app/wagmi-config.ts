"use client";

import { createClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, mainnet, goerli } from "@wagmi/core";
import { polygon, avalanche } from "wagmi/chains";

const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;

export const wagmiConfig = () => {
  const { chains, provider } = configureChains(
    [mainnet, goerli, avalanche, polygon],
    [
      infuraProvider({ apiKey: infuraApiKey } as { apiKey: string }),
      publicProvider(),
    ]
  );

  const client = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
  });

  return { client, chains };
};
