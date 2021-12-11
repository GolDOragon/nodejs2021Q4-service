import { AppError } from './AppError';

export class ServiceError extends AppError {
  constructor(message: string, code: number) {
    super({ message, code, logFile: 'serviceLog.txt', name: 'ServiceError' });

    this.logger();
  }
}

export const SERVICE_ERROR_CODES = {
  BAD_REQUEST: 400,
  INVALID_ID: 400,
  REQUIRED_FIELD: 400,
};
