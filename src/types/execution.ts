export type ExecutionStatus = 'queued' | 'running' | 'waiting_approval' | 'completed' | 'failed' | 'rejected';

export interface ExecutionLog {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

export interface ExecutionRecord {
  id: string;
  workflowType: string;
  status: ExecutionStatus;
  signalType: string;
  payload?: unknown;
  result?: unknown;
  logs: ExecutionLog[];
  createdAt: string;
  updatedAt: string;
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  error?: string;
}
