import { ExecutionEngine } from '../core/execution-engine';

export abstract class BaseAgent {
  constructor(protected executionEngine: ExecutionEngine) {}

  abstract name: string;

  abstract run(executionId: string, payload?: unknown): Promise<void>;
}
