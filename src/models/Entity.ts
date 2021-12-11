import crypto from 'crypto';

export class Entity {
  public id: string;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
