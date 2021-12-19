import crypto from 'crypto';

// no idea how not to use "any"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Newable<T> = { new (...args: any[]): T };

/**
 * Represent basic entity in database
 */
export abstract class Entity {
  /** UUID */
  public id: string;

  /** Create base entity */
  constructor() {
    this.id = crypto.randomUUID();
  }
}
