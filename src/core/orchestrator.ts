import { SignalBus, Signal } from './signal-bus';

export class Orchestrator {
  constructor(private signalBus: SignalBus) {}

  start() {
    this.signalBus.subscribe('example_event', (signal: Signal) => {
      console.log('[Orchestrator] received:', signal);
    });
  }
}