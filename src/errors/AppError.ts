import fs from 'fs/promises';
import path from 'path';

/** Options for {@link AppError} */
interface AppErrorType {
  /** error message */
  message: string;
  /** Error class name */
  name: string;
  /** error code */
  code: number;
  /** a file which will be using for logging errors */
  logFile: string;
}

/**
 * Represent API errors, can log errors in a file
 */
export class AppError extends Error {
  public code: number;

  public logFile: string;

  /**
   * Create a application error
   * @param options options for Error {@link AppErrorType}
   *
   * @returns Application error
   */
  constructor({ message, name, code, logFile }: AppErrorType) {
    super(message);

    this.name = name;
    this.code = code;
    this.logFile = logFile;
  }

  /**
   * Log all error in selected file
   */
  logger() {
    fs.appendFile(
      path.resolve(__dirname, this.logFile),
      `[${new Date().toISOString()}] code: ${this.code}, message: ${
        this.message
      }\n`
    ).catch(() =>
      console.log('Oops, something terrible happened to the AppError')
    );
  }
}
