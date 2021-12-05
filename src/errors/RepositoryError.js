const { AppError } = require('./AppError');

class RepositoryError extends AppError {
  constructor(message, code) {
    super({
      message,
      code,
      logFile: 'repositoryLog.txt',
      name: 'RepositoryError',
    });

    this.logger();
  }
}

const REPOSITORY_CODES = {
  NON_EXIST_ENTITY: 404,
  INVALID_ENTITY: 400,
};

module.exports = {
  RepositoryError,
  REPOSITORY_CODES,
};
