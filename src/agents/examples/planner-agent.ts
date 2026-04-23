import { BaseAgent } from '../base-agent';

export class PlannerAgent extends BaseAgent {
  name = 'planner-agent';

  async run(executionId: string, payload?: any) {
    this.executionEngine.addLog(executionId, 'Generating spec from request');

    const spec = {
      title: payload?.title || 'Generated Feature',
      tasks: ['Design API', 'Implement service', 'Write tests']
    };

    this.executionEngine.addLog(executionId, 'Spec generated');
    this.executionEngine.updateStatus(executionId, 'waiting_approval');

    return spec;
  }
}