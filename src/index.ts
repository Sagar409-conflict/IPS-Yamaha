import express, { Request, Response, Application } from 'express';
import route from './routes/index';
import { CONFIG } from './config/config';
import { applyMiddlewares } from './middleware/server.middleware';
import { initializeDatabase } from './database/connection';
import { globalErrorHandler } from './middleware/globalErrorhandler.middleware';

const app: Application = express();

applyMiddlewares(app);

// Basic route

app.get('/', (req: Request, res: Response): void => {
  res.json('Thank you for visiting YAMAHA APP 👋🏻 !');
});

app.get('/api', (req: Request, res: Response): void => {
  res.json('Thank you for visiting YAMAHA APP 👋🏻 !');
});

app.use('/api', route);
app.use(globalErrorHandler)

const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();

    app.listen(CONFIG.PORT, () => {
      console.log(`🚀 Server running on ${CONFIG.URL}:${CONFIG.PORT}`);
    });
  } catch (error) {
    console.error('🔴 Failed to start server:');
    process.exit(1);
  }
};

process.on('uncaughtException', (reason, promise) => {
  console.error('Uncaught Exception: at:', promise, 'reason:', reason)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})


startServer();
