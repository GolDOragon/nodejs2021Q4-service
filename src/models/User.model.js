const { Entity } = require('./Entity');

class User extends Entity {
  constructor(name, login, password) {
    super();

    this.name = name;
    this.login = login;
    this.password = password;
  }

  static isValidArgs({ name, login, password }) {
    return (
      typeof name === 'string' &&
      name.length > 4 &&
      typeof login === 'string' &&
      login.length > 4 &&
      typeof password === 'string' &&
      password.length > 6
    );
  }
}

module.exports = { User };
