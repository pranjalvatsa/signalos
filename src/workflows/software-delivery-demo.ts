import readline from 'readline';
import { ExecutionEngine } from '../core/execution-engine';
import { ApprovalEngine } from '../core/approval-engine';
import { PlannerAgent } from '../agents/examples/planner-agent';
import { CodingAgent } from '../agents/examples/coding-agent';

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

export async function runSoftwareDeliveryDemo(requestTitle: string) {
  const executionEngine = new ExecutionEngine();
  const approvalEngine = new ApprovalEngine(executionEngine);

  const planner = new PlannerAgent(executionEngine);
  const coder = new CodingAgent(executionEngine);

  // Step 1: Request
  console.log('\n🚀 Request received');

  const execution = executionEngine.createExecution({
    workflowType: 'software_delivery',
    signalType: 'request_submitted',
    payload: { title: requestTitle },
    approvalRequired: true
  });

  console.log(`🆔 Execution ID: ${execution.id}`);

  // Step 2: Planning
  console.log('\n🧠 Planner: Generating spec...');
  executionEngine.updateStatus(execution.id, 'running');
  await planner.run(execution.id, execution.payload);

  const current = executionEngine.getExecution(execution.id);
  console.log('📄 Spec ready:', JSON.stringify(current?.result, null, 2));

  // Step 3: Approval
  console.log('\n⏳ Waiting for approval...');

  const answer = await askQuestion('Approve this plan? (y/n): ');

  if (answer.toLowerCase() !== 'y') {
    console.log('❌ Rejected by user');
    approvalEngine.reject(execution.id, 'cli-user');
    return;
  }

  console.log('✅ Approved');
  approvalEngine.approve(execution.id, 'cli-user');

  // Step 4: Coding
  console.log('\n👨‍💻 Coding Agent: Generating code...');
  await coder.run(execution.id, execution.payload);

  const final = executionEngine.getExecution(execution.id);

  console.log('\n🔀 PR Created:', final?.result?.pullRequest?.title);
  console.log('🔗 PR Link:', final?.result?.pullRequest?.url);

  console.log('\n🎉 Workflow Completed');
}
