const { AppError } = require('./AppError');

class ServiceError extends AppError {
  constructor(message, code) {
    super({ message, code, logFile: 'serviceLog.txt', name: 'ServiceError' });

    this.logger();
  }
}

const SERVICE_ERROR_CODES = {
  BAD_REQUEST: 400,
  INVALID_ID: 400,
  REQUIRED_FIELD: 400,
};

module.exports = {
  ServiceError,
  SERVICE_ERROR_CODES,
};
