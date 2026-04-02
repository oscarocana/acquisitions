import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';

const app = express();

app.use(helmet());

app.get('/', (req, res) => {
  logger.info('Received a request to the root endpoint');
  res.status(200).send('Hello From Acquisitions API!');
});

export default app;
