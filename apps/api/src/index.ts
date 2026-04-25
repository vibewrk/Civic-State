import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { initSentry } from './lib/sentry.js';

// Initialize Sentry before any other middleware
initSentry();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sentry error handler must be after all routes
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;
