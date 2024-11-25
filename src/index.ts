import express, { Application } from 'express';

const app: Application = express();
const PORT = 3000;

// Basic middleware and routes
app.get('/', (req, res) => {
  res.send('Hello from TypeScript');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
