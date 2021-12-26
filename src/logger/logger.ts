import { createLogger, transports, format } from 'winston';
import { DEBUG_LEVEL } from '../common/config';
import { levelFilter, LEVELS, LogLevels } from './options';

const START_SERVER_DATE = new Date();
const level = (DEBUG_LEVEL as LogLevels) ?? LogLevels.Info;

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
      dirname: 'logs',
      filename: `${level}-${START_SERVER_DATE.valueOf()}.log`,
      format: format.combine(...formats, levelFilter(level)),
    }),

    new transports.Console({ level: LogLevels.Error }),
  ],

  exitOnError: false,
});
