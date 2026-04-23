# SignalOS

Open-source control plane for agentic workflows.

SignalOS helps you build production-grade AI systems with:
- event-driven orchestration
- human approval loops (HITL)
- execution tracking and audit logs
- pluggable agent registry
- workflow-safe state transitions

## Why SignalOS?

Most agent demos stop at prompt execution. Real systems need:
- traceability
- approval gates
- orchestration
- retries and state
- observability

SignalOS provides the backbone for those workflows.

## Core concepts

- **Signals**: typed events that trigger workflows
- **Executions**: tracked runs with status, logs, payloads, and results
- **Approvals**: human-in-the-loop gates before risky actions
- **Agents**: pluggable workers that react to signals or explicit runs
- **Orchestrator**: routes signals to the right agents and workflows

## Example use cases

- software delivery pipeline: request -> spec -> approval -> PR
- content workflows with approvals
- internal business process automation
- multi-agent operational copilots

## Project structure

```text
src/
  core/
    orchestrator/
    signal-bus/
    execution-engine/
    approval-engine/
  agents/
    base/
    registry/
    examples/
  workflows/
    software-delivery/
  types/
```

## Current status

This repo contains the initial scaffold for the SignalOS control plane.

## Roadmap

- persistent adapters for Mongo/Postgres/Redis
- GitHub and Jira integrations
- approval inbox API
- workflow state machine support
- hosted control plane

## License

MIT
