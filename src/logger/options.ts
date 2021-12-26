import { transports } from 'winston';

const START_SERVER_DATE = new Date();

export enum LOG_LEVELS {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Http = 'http',
  Debug = 'debug',
}

export const OPTIONS: Record<LOG_LEVELS, transports.FileTransportOptions> = {
  error: {
    level: LOG_LEVELS.Error,
    dirname: 'logs/error',
    filename: `error-${START_SERVER_DATE.valueOf()}.log`,
    handleExceptions: true,
    handleRejections: true,
  },
  warn: {
    level: LOG_LEVELS.Warn,
    dirname: 'logs/warn',
    filename: `warn-${START_SERVER_DATE.valueOf()}.log`,
  },
  info: {
    level: LOG_LEVELS.Info,
    dirname: 'logs/info',
    filename: `info-${START_SERVER_DATE.valueOf()}.log`,
  },
  http: {
    level: LOG_LEVELS.Http,
    dirname: 'logs/http',
    filename: `http-${START_SERVER_DATE.valueOf()}.log`,
  },
  debug: {
    level: LOG_LEVELS.Debug,
  },
};
