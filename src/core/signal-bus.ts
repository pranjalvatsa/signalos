import { EventEmitter } from 'events';

export interface Signal {
  type: string;
  payload?: any;
}

export class SignalBus extends EventEmitter {
  publish(signal: Signal) {
    this.emit(signal.type, signal);
  }

  subscribe(type: string, handler: (signal: Signal) => void) {
    this.on(type, handler);
  }
}