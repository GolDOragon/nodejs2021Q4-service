import { createLogger, transports, format } from 'winston';
import { BACKEND_DEBUG_LEVEL } from '../common/config';
import { levelFilter, LEVELS, LogLevels } from './options';

const START_SERVER_DATE = new Date();
const level = (BACKEND_DEBUG_LEVEL as LogLevels) ?? LogLevels.Info;

const formats = [
  format.timestamp(),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
  format.prettyPrint(),
];

export const logger = createLogger({
  levels: LEVELS,
  level,
  format: format.combine(...formats),

  transports: [
    new transports.File({
      dirname: 'logs/error',
      filename: `${LogLevels.Error}-${START_SERVER_DATE.valueOf()}.log`,
      format: format.combine(...formats, levelFilter(LogLevels.Error)),
    }),
    new transports.File({
      dirname: 'logs',
      filename: `${level}-${START_SERVER_DATE.valueOf()}.log`,
      format: format.combine(...formats, levelFilter(level)),
    }),

    new transports.Console({ level }),
  ],

  exitOnError: false,
});
