import { SignalBus } from './core/signal-bus';
import { Orchestrator } from './core/orchestrator';

const signalBus = new SignalBus();
const orchestrator = new Orchestrator(signalBus);

// Example signal
signalBus.publish({ type: 'example_event', payload: { message: 'Hello SignalOS' } });

orchestrator.start();

console.log('SignalOS started');