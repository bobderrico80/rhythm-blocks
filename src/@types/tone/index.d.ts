declare module 'tone' {
  export interface Transport {
    on: (eventName: string, handler: () => void) => void;
    off: (eventName: string) => void;
    start: () => void;
    stop: () => void;
    cancel: () => void;
    schedule: (callback: (time: number) => void, elapsedTime: number) => void;
  }

  export interface Master {
    triggerAttackRelease(pitch: string, duration: number, time: number): void;
  }

  export class Synth {
    toMaster: () => Master;
  }

  export interface Time extends number {
    toSeconds: () => number;
    toMilliseconds: () => number;
    valueOf: () => number;
  }

  export const Transport: Transport;
  export const Time: (input: number | string) => Time;
}
