#!/usr/bin/env python3
"""Python simulation for Claude Operator (minimal)
Run: python -m agent.sim
"""
import os
import random
import json
from datetime import datetime

SIM = os.getenv('SIMULATION_MODE', 'true').lower() == 'true'
VOTE = os.getenv('VOTE_ACCOUNT', 'GEgnNd6AyNshufepHS2HVXhDSRKwhjqgAYvWSnKCyQWf')
COMM_BPS = int(os.getenv('COMMISSION_BPS', '70'))


def sample_metrics():
    return {
        'slotLag': random.randint(0, 10),
        'delinquent': random.random() < 0.02,
        'cpuPct': random.randint(1, 95),
        'memPct': random.randint(40, 98),
        'diskPct': random.randint(10, 95),
        'rpcHealthy': random.random() > 0.05,
    }


def analyze(m):
    issues = []
    if m['delinquent']:
        issues.append('DELINQUENT')
    if m['slotLag'] > 4:
        issues.append('SLOT_LAG')
    if m['cpuPct'] > 85:
        issues.append('HIGH_CPU')
    if m['memPct'] > 90:
        issues.append('HIGH_MEM')
    if m['diskPct'] > 90:
        issues.append('DISK_PRESSURE')
    if not m['rpcHealthy']:
        issues.append('RPC_FAIL')
    return issues


def suggest_actions(issues):
    actions = []
    for it in issues:
        if it in ('DELINQUENT', 'SLOT_LAG'):
            actions.append('restart-validator-service')
        if it in ('HIGH_CPU', 'HIGH_MEM'):
            actions.append('investigate-processes')
        if it == 'DISK_PRESSURE':
            actions.append('rotate-logs-and-clean')
        if it == 'RPC_FAIL':
            actions.append('restart-rpc-service')
    if not issues:
        actions.append('no-op')
    return list(dict.fromkeys(actions))


def main():
    metrics = sample_metrics()
    issues = analyze(metrics)
    actions = suggest_actions(issues)

    report = {
        'timestamp': datetime.utcnow().isoformat() + 'Z',
        'vote': VOTE,
        'metrics': metrics,
        'issues': issues,
        'proposed_actions': actions,
        'simulation': SIM,
    }

    print('CLAUDATOR OPERATOR SIMULATION')
    print(json.dumps(report, indent=2))
    print('\nProposed actions:')
    for a in actions:
        if SIM:
            print('-', '[SIMULATION] would run:', a)
        else:
            print('-', '[EXECUTE] running:', a)

    print('\nCommission rate:', COMM_BPS / 100, '% (bps=', COMM_BPS, ')')


if __name__ == '__main__':
    main()
