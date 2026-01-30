Claude Operator agent

- `sim.js`: Node.js simulation mode for the agent. Run with `npm run sim`.
- This prototype reads `.env` for configuration and prints detected issues and proposed remediation actions.

Behavior:
- Default alert target is console (simulation). You can configure `DISCORD_WEBHOOK` or `X_API_KEYS` as env vars; in simulation mode no outbound calls are made.

Security:
- The agent must never embed private keys in repo.
- For production, run the agent as a dedicated user with limited privileges.
