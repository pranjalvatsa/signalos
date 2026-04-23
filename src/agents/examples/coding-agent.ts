import { BaseAgent } from '../base-agent';
import { createPullRequest } from '../../integrations/github';
import { typeText, sleep } from '../../utils/cli-effects';

export class CodingAgent extends BaseAgent {
  name = 'coding-agent';

  async run(executionId: string, payload?: any): Promise<void> {
    this.executionEngine.addLog(executionId, 'Generating implementation...');

    const base = (payload?.title || 'generated')
      .toLowerCase()
      .replace(/\s+/g, '-');

    const branch = `feature/${base}-${Date.now()}`;

    // 🔥 Diff-style preview
    const diff = `\n+ // Auto-generated code for: ${payload?.title}\n\n+ export function handler(req, res) {\n+   res.json({ message: "Hello from ${payload?.title}" });\n+ }\n`;

    console.log('\n🧾 Code Diff Preview:\n');
    await sleep(600);
    await typeText(diff, 6);

    let prUrl = 'N/A';

    try {
      const token = process.env.GITHUB_TOKEN!;
      const owner = process.env.GITHUB_OWNER!;
      const repo = process.env.GITHUB_REPO!;

      console.log('\n🚀 Committing changes...');
      await sleep(700);

      console.log('🌿 Creating branch...');
      await sleep(700);

      console.log('🔀 Opening pull request...');
      await sleep(900);

      prUrl = await createPullRequest({
        token,
        owner,
        repo,
        branch,
        title: `feat: ${payload?.title}`,
        content: diff
      });

      this.executionEngine.addLog(executionId, 'PR created successfully');
    } catch (err: any) {
      console.error("❌ GitHub Error:", err.response?.data || err.message);
      this.executionEngine.addLog(executionId, `GitHub failed: ${err.message}`, 'error');
    }

    const result = {
      branch,
      preview: diff,
      pullRequest: {
        title: `feat: ${payload?.title}`,
        url: prUrl
      }
    };

    this.executionEngine.setResult(executionId, result);
    this.executionEngine.updateStatus(executionId, 'completed');
  }
}
