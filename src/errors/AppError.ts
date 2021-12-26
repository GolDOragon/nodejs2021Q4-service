import { logger } from '../logger';

/** Options for {@link AppError} */
interface AppErrorType {
  /** error message */
  message: string;
  /** Error class name */
  name: string;
  /** error code */
  code: number;
}

/**
 * Represent API errors, can log errors in a file
 */
export class AppError extends Error {
  public code: number;

  /**
   * Create a application error
   * @param options - options for Error {@link AppErrorType}
   *
   * @returns Application error
   */
  constructor({ message, name, code }: AppErrorType) {
    super(message);

    this.name = name;
    this.code = code;
  }

  /**
   * Log all error in selected file
   */
  logger() {
    logger.error(this.message, {
      name: this.name,
      code: this.code,
    });
  }
}
