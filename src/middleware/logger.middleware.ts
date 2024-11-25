import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

// Log all requests
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
};

// Log errors
export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack });
  next(err); // Pass error to next handler
};
