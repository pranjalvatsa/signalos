import { runSoftwareDeliveryDemo } from './workflows/software-delivery-demo';

async function main() {
  const request = process.argv.slice(2).join(' ').trim() || 'Build user authentication API';

  console.log('🚀 Starting SignalOS Demo...');
  console.log(`📝 Request: ${request}`);

  await runSoftwareDeliveryDemo(request);
}

main().catch((error) => {
  console.error('❌ SignalOS failed to run:', error);
  process.exit(1);
});
