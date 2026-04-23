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

  console.log('\n==============================');
  console.log('🚀 REQUEST PHASE');
  console.log('==============================');
  await sleep(400);

  const execution = executionEngine.createExecution({
    workflowType: 'software_delivery',
    signalType: 'request_submitted',
    payload: { title: requestTitle },
    approvalRequired: true
  });

  console.log(`📝 Request: ${requestTitle}`);
  console.log(`🆔 Execution ID: ${execution.id}`);
  await sleep(700);

  console.log('\n==============================');
  console.log('🧠 PLANNING PHASE');
  console.log('==============================');

  console.log('🧠 Thinking...');
  await sleep(1000);

  console.log('📄 Generating spec...');
  executionEngine.updateStatus(execution.id, 'running');
  await planner.run(execution.id, execution.payload);

  const current = executionEngine.getExecution(execution.id);
  console.log('\n📄 Spec ready:');
  console.log(JSON.stringify(current?.result, null, 2));
  await sleep(800);

  console.log('\n==============================');
  console.log('⏳ APPROVAL PHASE');
  console.log('==============================');

  const answer = await askQuestion('Approve this plan? (y/n): ');

  if (answer.toLowerCase() !== 'y') {
    console.log('❌ Rejected by user');
    approvalEngine.reject(execution.id, 'cli-user');
    return;
  }

  console.log('✅ Approved');
  await sleep(800);

  console.log('\n==============================');
  console.log('👨‍💻 CODING PHASE');
  console.log('==============================');

  console.log('⚙️ Writing code...');
  await sleep(1000);

  await coder.run(execution.id, execution.payload);

  const final = executionEngine.getExecution(execution.id);
  const result: any = final?.result;

  console.log('\n🚀 Pushing changes to GitHub...');
  await sleep(1200);

  console.log('\n🎉 SUCCESS!');
  console.log(`🔗 PR: ${result?.pullRequest?.url}`);

  console.log('\n==============================');
  console.log('📊 EXECUTION SUMMARY');
  console.log('==============================');

  console.log('1. Request received');
  console.log('2. Spec generated');
  console.log('3. Approval granted');
  console.log('4. Code generated');
  console.log('5. PR created');
}
