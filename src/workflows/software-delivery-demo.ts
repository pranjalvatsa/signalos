import { SignalBus } from '../core/signal-bus';
import { ExecutionEngine } from '../core/execution-engine';
import { ApprovalEngine } from '../core/approval-engine';
import { PlannerAgent } from '../agents/examples/planner-agent';
import { CodingAgent } from '../agents/examples/coding-agent';

export function runSoftwareDeliveryDemo() {
  const signalBus = new SignalBus();
  const executionEngine = new ExecutionEngine();
  const approvalEngine = new ApprovalEngine(executionEngine);

  const planner = new PlannerAgent(executionEngine);
  const coder = new CodingAgent(executionEngine);

  // Step 1: Business request
  const execution = executionEngine.createExecution({
    workflowType: 'software_delivery',
    signalType: 'request_submitted',
    payload: { title: 'User Authentication API' },
    approvalRequired: true
  });

  console.log('\n🚀 New Request Submitted');
  console.log('Execution ID:', execution.id);

  // Step 2: Planner runs
  executionEngine.updateStatus(execution.id, 'running');
  planner.run(execution.id, execution.payload);

  console.log('\n⏳ Waiting for approval...');

  // Step 3: Simulate approval
  setTimeout(() => {
    console.log('\n✅ Approved by user');
    approvalEngine.approve(execution.id, 'demo-user');

    // Step 4: Coding agent runs
    coder.run(execution.id, execution.payload);

    // Final state
    setTimeout(() => {
      const result = executionEngine.getExecution(execution.id);
      console.log('\n🎉 Workflow Completed');
      console.log(JSON.stringify(result, null, 2));
    }, 500);

  }, 1000);
}
