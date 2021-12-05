const { Entity } = require('./Entity');

class User extends Entity {
  constructor({ name, login, password }) {
    super();

    this.name = name;
    this.login = login;
    this.password = password;
  }

  static isValidArgs({ name, login, password }) {
    return (
      typeof name === 'string' &&
      typeof login === 'string' &&
      typeof password === 'string'
    );
  }

  static toResponse({ id, name, login }) {
    return { id, name, login };
  }
}

module.exports = { User };
