import crypto from 'crypto';

// no idea how not to use "any"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<T> = { new (...args: any[]): T };

export abstract class Entity {
  public id: string;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
