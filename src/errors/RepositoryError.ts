import { AppError } from './AppError';

export class RepositoryError extends AppError {
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
