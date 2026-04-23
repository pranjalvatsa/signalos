import { BaseAgent } from '../base-agent';
import { createPullRequest } from '../../integrations/github';

export class CodingAgent extends BaseAgent {
  name = 'coding-agent';

  async run(executionId: string, payload?: any): Promise<void> {
    this.executionEngine.addLog(executionId, 'Generating implementation...');

    const base = (payload?.title || 'generated')
      .toLowerCase()
      .replace(/\s+/g, '-');

    const branch = `feature/${base}-${Date.now()}`;

    // 🔥 Code preview
    const generatedCode = `// Auto-generated code for: ${payload?.title}

export function handler(req, res) {
  res.json({ message: "Hello from ${payload?.title}" });
}`;

    console.log('\n🧾 Generated Code Preview:\n');
    console.log(generatedCode);

    let prUrl = 'N/A';

    try {
      const token = process.env.GITHUB_TOKEN!;
      const owner = process.env.GITHUB_OWNER!;
      const repo = process.env.GITHUB_REPO!;

      prUrl = await createPullRequest({
        token,
        owner,
        repo,
        branch,
        title: `feat: ${payload?.title}`,
        content: generatedCode
      });

      this.executionEngine.addLog(executionId, 'PR created successfully');
    } catch (err: any) {
      console.error("❌ GitHub Error:", err.response?.data || err.message);
      this.executionEngine.addLog(executionId, `GitHub failed: ${err.message}`, 'error');
    }

    const result = {
      branch,
      preview: generatedCode,
      pullRequest: {
        title: `feat: ${payload?.title}`,
        url: prUrl
      }
    };

    this.executionEngine.setResult(executionId, result);
    this.executionEngine.updateStatus(executionId, 'completed');
  }
}
