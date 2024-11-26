import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../shared/utils/ApiError';
import config from '../config/config';
import logger from '../config/logger';

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { statusCode, message } = err;

  if (config.app.env === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'INTERNAL_SERVER_ERROR';
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.app.env === 'development' && { stack: err.stack }),
  };

  if (config.app.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export default errorHandler;
