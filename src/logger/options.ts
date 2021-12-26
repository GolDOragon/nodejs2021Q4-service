import { format } from 'winston';

export enum LogLevels {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Http = 'http',
  Debug = 'debug',
}

export const LEVELS: Record<LogLevels, number> = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const levelFilter = (chosenLevel: LogLevels) =>
  format((info) => {
    if (LEVELS[info.level as LogLevels] > LEVELS[chosenLevel]) return false;

    return info;
  })();
