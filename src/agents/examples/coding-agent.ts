import { BaseAgent } from '../base-agent';

export class CodingAgent extends BaseAgent {
  name = 'coding-agent';

  async run(executionId: string, payload?: any): Promise<void> {
    this.executionEngine.addLog(executionId, 'Generating implementation plan from approved spec');

    const mockResult = {
      branchName: `feature/${(payload?.title || 'generated-feature').toLowerCase().replace(/\s+/g, '-')}`,
      filesChanged: [
        'src/routes/generated-feature.ts',
        'src/services/generated-feature.service.ts',
        'src/tests/generated-feature.test.ts'
      ],
      pullRequest: {
        title: `feat: ${payload?.title || 'Generated Feature'}`,
        url: 'https://github.com/example/repo/pull/1'
      }
    };

    this.executionEngine.addLog(executionId, 'Mock code generated');
    this.executionEngine.addLog(executionId, `Mock PR prepared: ${mockResult.pullRequest.title}`);
    this.executionEngine.setResult(executionId, mockResult);
    this.executionEngine.updateStatus(executionId, 'completed');
  }
}
