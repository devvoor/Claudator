Commission accounting and reinvestment

- `monitor.js`: simulated watcher that detects commission inflows and writes receipts to `reinvestment/receipts`.
- Receipts are JSON files with event metadata and simulated buyback flag.

Notes:
- In production, use Solana RPC or indexed rewards to detect vote-account rewards, then submit transfers via a secured signer.
- Do NOT hardcode token mints or private keys in the repository. Use env/config placeholders.
