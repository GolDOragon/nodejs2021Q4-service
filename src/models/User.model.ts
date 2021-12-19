import { Entity } from './Entity';

export type UserFields = {
  /** user name */
  name: string;
  /** user login */
  login: string;
  /** user password */
  password: string;
};

/** Represent user in database */
export class User extends Entity {
  public name: string;

  public login: string;

  public password: string;

  /**
   * Create User with base fields
   * @param object base fields {@link UserFields}
   *
   * @returns User instance
   */
  constructor({ name, login, password }: UserFields) {
    super();

    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Check if the object can be used in user creation
   * @param object object see {@link UserFields}
   * @returns true if we can create a user from object, otherwise false
   */
  static isValidArgs({ name, login, password }: UserFields): boolean {
    return (
      typeof name === 'string' &&
      typeof login === 'string' &&
      typeof password === 'string'
    );
  }

  /**
   * Remove secret field from user
   * @param user {@link User}
   * @returns User without secret fields
   */
  static toResponse({ id, name, login }: User): Partial<User> {
    return { id, name, login };
  }
}
