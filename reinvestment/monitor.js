#!/usr/bin/env node
// Simulated commission monitoring and reinvestment stub
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const SIM = (process.env.SIMULATION_MODE || 'true') === 'true';
const TREASURY = process.env.TREASURY_ADDRESS || 'treasury-placeholder';

function fetchCommissionEvent() {
  // Simulate a commission inflow event
  return {
    slot: Math.floor(Math.random() * 10000000),
    lamports: Math.floor(1000000 + Math.random() * 100000000),
    source: 'vote-account',
    timestamp: new Date().toISOString()
  };
}

function toSOL(lamports) { return lamports / 1e9; }

function writeReceipt(evt) {
  const dir = path.resolve(process.cwd(), 'reinvestment', 'receipts');
  fs.mkdirSync(dir, { recursive: true });
  const name = `receipt-${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
  const payload = {
    treasury: TREASURY,
    commission_bps: process.env.COMMISSION_BPS || '70',
    event: evt,
    sol_amount: toSOL(evt.lamports),
    simulated_buyback: SIM ? true : false
  };
  fs.writeFileSync(path.join(dir, name), JSON.stringify(payload, null, 2));
  return path.join('reinvestment', 'receipts', name);
}

function main() {
  console.log('Reinvestment monitor — simulation:', SIM);
  const evt = fetchCommissionEvent();
  console.log('Detected commission inflow:', evt.lamports, 'lamports (~', toSOL(evt.lamports), 'SOL)');

  const receiptPath = writeReceipt(evt);
  console.log('Wrote receipt:', receiptPath);
  console.log('- If not in simulation, would attempt transfer to treasury and optional buyback via JUPITER endpoint (stubbed).');
}

main();
