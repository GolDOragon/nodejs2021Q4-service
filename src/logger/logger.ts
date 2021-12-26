import { createLogger, transports, format } from 'winston';
import { DEBUG_LEVEL } from '../common/config';
import { OPTIONS } from './options';

export const logger = createLogger({
  level: DEBUG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.prettyPrint()
  ),

  transports: [
    new transports.File(OPTIONS.error),
    new transports.File(OPTIONS.warn),
    new transports.File(OPTIONS.info),
    new transports.File(OPTIONS.http),
    new transports.Console(OPTIONS.debug),
  ],

  exitOnError: false,
});
