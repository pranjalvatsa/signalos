import { ExecutionEngine } from './execution-engine';

export class ApprovalEngine {
  constructor(private executionEngine: ExecutionEngine) {}

  approve(executionId: string, userId: string) {
    const exec = this.executionEngine.getExecution(executionId);
    if (!exec) return;

    exec.status = 'running';
    exec.approvedBy = userId;
    exec.approvedAt = new Date().toISOString();
  }

  reject(executionId: string, userId: string) {
    const exec = this.executionEngine.getExecution(executionId);
    if (!exec) return;

    exec.status = 'rejected';
    exec.rejectedBy = userId;
    exec.rejectedAt = new Date().toISOString();
  }
}