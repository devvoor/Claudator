#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const RECEIPTS_DIR = path.resolve(process.cwd(), 'reinvestment', 'receipts');

function listReceipts() {
  try {
    const files = fs.readdirSync(RECEIPTS_DIR).filter(f => f.endsWith('.json'));
    return files.map(f => {
      const content = fs.readFileSync(path.join(RECEIPTS_DIR, f), 'utf8');
      return JSON.parse(content);
    });
  } catch (e) {
    return [];
  }
}

const server = http.createServer((req, res) => {
  const p = url.parse(req.url).pathname;
  if (p === '/' || p === '/index.html') {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }
  if (p === '/api/status') {
    const status = {
      uptime: process.uptime(),
      validator: {
        voteAccount: process.env.VOTE_ACCOUNT || 'GEgnNd6AyNshufepHS2HVXhDSRKwhjqgAYvWSnKCyQWf',
        delinquent: false,
        slotLag: 0,
        voteCredits: Math.floor(Math.random() * 100000)
      }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(status));
  }
  if (p === '/api/commissions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ receipts: listReceipts() }));
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log('Dashboard server running on http://localhost:' + PORT);
});
