import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { requestLogger } from './logger.middleware';
import { swaggerSpecs } from '../config/swagger.config';
import { createDirIfNotExists } from '../shared/utils/util';

export const applyMiddlewares = (app: express.Application): void => {
  // Body parser middleware
  app.use(express.json()); // Parses incoming JSON requests
  app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

  // Security headers middleware (Helmet)
  app.use(helmet());

  // CORS middleware
  app.use(cors());

  // Creating directory for logging
  const logDir = path.join(__dirname, 'logs')
  createDirIfNotExists(logDir)
  
  // Rate limiting middleware
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });
  app.use(limiter);

  // Swagger setup
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  // Request logger middleware
  app.use(requestLogger);
};
