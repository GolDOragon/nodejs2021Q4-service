import { AppError } from './AppError';

/**
 * Represent Services errors, can log errors in a file
 */
export class ServiceError extends AppError {
  /**
   * Create Service's errors
   * @param message error message
   * @param code error code {@link SERVICE_ERROR_CODES}
   *
   * @returns Service error
   */
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
