import express, { Request, Response, Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import config from './config/config';
import AppDataSource from './database/data-source';

const app: Application = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Security headers using Helmet
app.use(helmet());

// Enable CORS
app.use(cors());

// Rate Limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Basic route

app.get('/', (req: Request, res: Response): void => {
  res.json('Thank you for visiting YAMAHA APP 👋🏻 !');
});

// Start the database and server
AppDataSource.initialize()
  .then(() => {
    console.log('🟢 Database connection established');

    app.listen(config.app.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.app.port}`);
    });
  })
  .catch((error) => {
    console.error(
      `🔴 Error during Data Source initialization:', ${error.message}`,
    );
  });
