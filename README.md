# Digital Signatures

Sign and verify Ethereum messages directly from your browser wallet.

## Features

- **Sign** — Connect your wallet and sign any plaintext message. The full signature and decoded components (r, s, v) are displayed and can be copied with a click.
- **Verify** — Paste a signature and the original message to recover the signer address and confirm whether it matches your connected wallet.
- **Persistent results** — Signing output is preserved when switching between Sign and Verify modes.
- **Wallet agnostic** — Connects to any injected browser wallet (Rabby, MetaMask, Brave Wallet, etc.) via wagmi's `InjectedConnector`.

## Tech Stack

- [Next.js](https://nextjs.org/) 14
- [React](https://react.dev/) 18
- [Chakra UI](https://chakra-ui.com/) 2
- [wagmi](https://wagmi.sh/) 0.11
- [ethers.js](https://docs.ethers.org/v5/) 5
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_INFURA_API_KEY` in a `.env.local` file for RPC provider access.

## License

MIT
