import { AppError } from './AppError';

/**
 * Represent Repositories errors, can log error in a file
 */
export class RepositoryError extends AppError {
  /**
   * Create Repository's errors
   * @param message error message
   * @param code error code {@link REPOSITORY_CODES}
   *
   * @returns Repository error
   */
  constructor(message: string, code: number) {
    super({
      message,
      code,
      logFile: 'repositoryLog.txt',
      name: 'RepositoryError',
    });

    this.logger();
  }
}

export const REPOSITORY_CODES = {
  NON_EXIST_ENTITY: 404,
  INVALID_ENTITY: 400,
};
