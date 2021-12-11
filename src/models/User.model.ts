import { Entity } from './Entity';

type UserType = {
  id: string;
  name: string;
  login: string;
  password: string;
};

export class User extends Entity {
  public name: string;

  public login: string;

  public password: string;

  constructor({ name, login, password }: Omit<UserType, 'id'>) {
    super();

    this.name = name;
    this.login = login;
    this.password = password;
  }

  static isValidArgs({ name, login, password }: Omit<UserType, 'id'>) {
    return (
      typeof name === 'string' &&
      typeof login === 'string' &&
      typeof password === 'string'
    );
  }

  static toResponse({ id, name, login }: UserType) {
    return { id, name, login };
  }
}
