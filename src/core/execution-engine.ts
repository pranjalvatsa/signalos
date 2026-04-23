import { v4 as uuidv4 } from 'uuid';
import { ExecutionRecord } from '../types/execution';

export class ExecutionEngine {
  private executions: Map<string, ExecutionRecord> = new Map();

  createExecution(input: { workflowType: string; signalType: string; payload?: unknown; approvalRequired?: boolean }) {
    const now = new Date().toISOString();
    const execution: ExecutionRecord = {
      id: uuidv4(),
      workflowType: input.workflowType,
      signalType: input.signalType,
      status: 'queued',
      payload: input.payload,
      logs: [],
      createdAt: now,
      updatedAt: now,
      approvalRequired: !!input.approvalRequired
    };

    this.executions.set(execution.id, execution);
    return execution;
  }

  updateStatus(id: string, status: ExecutionRecord['status']) {
    const exec = this.executions.get(id);
    if (!exec) return;
    exec.status = status;
    exec.updatedAt = new Date().toISOString();
  }

  addLog(id: string, message: string, level: 'info' | 'warn' | 'error' = 'info') {
    const exec = this.executions.get(id);
    if (!exec) return;
    exec.logs.push({ timestamp: new Date().toISOString(), level, message });
  }

  getExecution(id: string) {
    return this.executions.get(id);
  }

  listExecutions() {
    return Array.from(this.executions.values());
  }

  setResult(id: string, result: unknown) {
  const exec = this.executions.get(id);
  if (!exec) return;
  exec.result = result;
  exec.updatedAt = new Date().toISOString();
}
}
