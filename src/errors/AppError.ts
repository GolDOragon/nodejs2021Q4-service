import fs from 'fs/promises';
import path from 'path';

type AppErrorType = {
  message: string;
  name: string;
  code: number;
  logFile: string;
};

export class AppError extends Error {
  public code: number;

  public logFile: string;

  constructor({ message, name, code, logFile }: AppErrorType) {
    super(message);

    this.name = name;
    this.code = code;
    this.logFile = logFile;
  }

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
