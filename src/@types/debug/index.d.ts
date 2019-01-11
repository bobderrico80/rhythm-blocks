// TODO: Figure out why we can't use @types/debug with the documented API

declare module 'debug' {
  export interface DebugCreator {
    (source: string, message: string): void;
    (message: string): void;
    color: string;
  }

  export function debug(namespace: string): DebugCreator;

  export = debug;
}
