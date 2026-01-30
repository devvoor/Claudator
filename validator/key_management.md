Secure key management guide (do not store real keys in the repo)

Principles:
- Keep identity keypair off the validator's OS where possible; use hardware security modules (HSM) or secure signing services.
- Use strict file permissions (600) and a dedicated user account for the validator service.
- Rotate keys following an operational policy and maintain an auditable history of rotations.
- Back up key material to encrypted, access-controlled vaults (e.g., HashiCorp Vault, cloud KMS).

Local key handling example (NOT for production):
- Store keypair at `/var/lib/solana/identity.json` owned by `solana` user.
- Ensure the service only reads keys and cannot exfiltrate them (network egress controls).

If using cloud providers, prefer managed KMS/HSM and sign via an API rather than storing raw key files.
