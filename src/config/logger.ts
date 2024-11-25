import { createLogger, format, transports } from 'winston';
import winston from 'winston';
import path from 'path';
import { LOG_COLORS, LOG_LEVELS } from '../shared/constant/constant';

winston.addColors(LOG_COLORS);
const logger = createLogger({
  level: LOG_LEVELS.DEBUG, // Default log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `${timestamp} [${level.toUpperCase()}] ${message} - ${stack}` // Log stack trace for errors
        : `${timestamp} [${level.toUpperCase()}] ${message}`;
    }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}] ${message}`;
        }),
      ),
    }),
    new transports.File({
      filename: path.join(__dirname, '../utils/logs/error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(__dirname, '../utils/logs/combined.log'),
    }),
  ],
});

// In production, log only to files
if (process.env.NODE_ENV === 'production') {
  logger.remove(new transports.Console());
}

export default logger;
