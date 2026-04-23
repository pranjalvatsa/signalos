import readline from 'readline';
import { ExecutionEngine } from '../core/execution-engine';
import { ApprovalEngine } from '../core/approval-engine';
import { PlannerAgent } from '../agents/examples/planner-agent';
import { CodingAgent } from '../agents/examples/coding-agent';
import { sleep } from '../utils/cli-effects';

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
}

export async function runSoftwareDeliveryDemo(requestTitle: string) {
  const executionEngine = new ExecutionEngine();
  const approvalEngine = new ApprovalEngine(executionEngine);

  const planner = new PlannerAgent(executionEngine);
  const coder = new CodingAgent(executionEngine);

  console.log('\n🚀 Request received');
  await sleep(500);

  const execution = executionEngine.createExecution({
    workflowType: 'software_delivery',
    signalType: 'request_submitted',
    payload: { title: requestTitle },
    approvalRequired: true
  });

  console.log(`🆔 Execution ID: ${execution.id}`);
  await sleep(500);

  console.log('\n🧠 Planner: Thinking...');
  await sleep(800);

  console.log('📄 Generating spec...');
  executionEngine.updateStatus(execution.id, 'running');
  await planner.run(execution.id, execution.payload);

  const current = executionEngine.getExecution(execution.id);
  console.log('📄 Spec ready:', JSON.stringify(current?.result, null, 2));

  console.log('\n⏳ Awaiting human approval...');
  const answer = await askQuestion('Approve this plan? (y/n): ');

  if (answer.toLowerCase() !== 'y') {
    console.log('❌ Rejected by user');
    approvalEngine.reject(execution.id, 'cli-user');
    return;
  }

  console.log('✅ Approved');
  await sleep(500);

  console.log('\n👨‍💻 Coding Agent: Writing code...');
  await sleep(700);

  await coder.run(execution.id, execution.payload);

  const final = executionEngine.getExecution(execution.id);
  const result: any = final?.result;

  console.log('\n🚀 Pushing changes to GitHub...');
  await sleep(800);

  console.log('\n🎉 SUCCESS!');
  console.log(`🔗 PR: ${result?.pullRequest?.url}`);

  console.log('\n📊 Execution Timeline:');
  console.log('1. Request received');
  console.log('2. Spec generated');
  console.log('3. Approval granted');
  console.log('4. Code generated');
  console.log('5. PR created');
}
