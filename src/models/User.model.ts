import { Entity } from './Entity';

export class User extends Entity {
  public name: string;

  public login: string;

  public password: string;

  constructor({ name, login, password }: Omit<User, 'id'>) {
    super();

    this.name = name;
    this.login = login;
    this.password = password;
  }

  static isValidArgs({ name, login, password }: Omit<User, 'id'>): boolean {
    return (
      typeof name === 'string' &&
      typeof login === 'string' &&
      typeof password === 'string'
    );
  }

  static toResponse({ id, name, login }: User): Partial<User> {
    return { id, name, login };
  }
}
