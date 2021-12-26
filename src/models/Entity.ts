import crypto from 'crypto';

export type Newable<T> = { new (...args: never[]): T };

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
