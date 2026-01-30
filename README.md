# $Claudator 

https://x.com/claudatorsolana

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/fa890909-e87a-4af3-9585-bf50b79c0e5a" />


**Pitch**

$Claudator is an experimental Solana validator project with an AI-operated operator layer inspired by "Claude"-style automation. The AI Operator continuously monitors validator health, suggests or executes safe remediation, tracks commissions, and routes commission flows into a transparent reinvestment pipeline. This repository is a hackathon prototype built in public for Pump.fun.

**Important disclaimers**

- Not affiliated with Solana Foundation, Pump.fun, Anthropic, or the commercial "Claude" product.
- This is experimental software. Use at your own risk.
- APY is not guaranteed and varies with network conditions; any APY numbers referenced are estimates or snapshots only.
- Staking involves risk: slashing, downtime, and smart contract risks may apply.
- Nothing in this repo is financial advice.

**What is $Claudator**

- A validator operations stack for Solana with an "AI Operator" layer that:
  - Reads validator metrics and RPC endpoints
  - Detects operational issues (slot lag, delinquency risk, resource pressure)
  - Posts alerts and can run safe remediation actions (in simulation or real mode)
  - Tracks vote-account commissions and routes them to a treasury for buybacks/liquidity
- An optional, controlled module for AI-assisted transaction prioritization policies (only when the node is the block producer). No malicious or protocol-violating behavior is implemented or encouraged.

**Validator Vote Account**

- Vote account: `GEgnNd6AyNshufepHS2HVXhDSRKwhjqgAYvWSnKCyQWf`
- Commission: configurable; default: `0.7%` (`COMMISSION_BPS=70`)

**How the Claude Operator works (what it can / cannot do)**

- Can: ingest Prometheus/RPC metrics, detect anomalies, post alerts to a webhook (Discord by default), run safe system actions (service restart, log rotation) when configured and authorized.
- Cannot: perform actions that break protocol rules or instruct the validator to behave maliciously. Transaction ordering influence is limited to allowed Solana behaviors; we phrase any such capability as "AI-assisted transaction prioritization policies" and provide it only as an optional, auditable module.

**Commission & reinvestment (transparent model)**

- Concept: 100% of validator commissions (as configured) are routed into a `$Claudator` treasury for buybacks / liquidity / treasury activities.
- Implementation: commission inflows are tracked, a receipt is written for each transfer, and simulated buyback calls to DEX routing (e.g., Jupiter) are stubbed in simulation mode.
- This is a transparency design, not a promise of returns.

**Quickstart (simulation mode)**

1. Copy `.env.example` to `.env` and fill placeholders.
2. Run CLI simulation (Node.js):

	npm install
	npm run sim

Or run Python simulation:

	python -m agent.sim

Simulation mode prints detected issues and proposed actions without touching the system or broadcasting real transactions.

**How to verify**

- You can inspect the vote account on public explorers (e.g., Solscan) by searching for the vote account `GEgnNd6AyNshufepHS2HVXhDSRKwhjqgAYvWSnKCyQWf`.

**Roadmap**

- Hackathon prototype: monitoring, safe remediation simulation, reinvestment accounting, dashboard
- Post-hackathon: hardened security, secret management, audited reinvestment contracts, production-grade observability and access controls

---

See the `/docs` folder for architecture, setup, security model, FAQ, and economics details.
