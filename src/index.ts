import dotenv from 'dotenv';
import express, { Application } from 'express';
import { requestLogger } from './middleware/logger.middleware';
import logger from './config/logger';

const app: Application = express();
// Configure dotenv
dotenv.config();
const PORT = process.env.PORT || 3000;

// Log requests
app.use(requestLogger);
// Basic middleware and routes
app.get('/', (req, res) => {
  res.send('Hello from TypeScript');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
