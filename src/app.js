import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '#routes/auth.routes.js';
import securityMiddleware from '#middleware/security.middleware.js';

const app = express();

app.set('trust proxy', 1); // 1. Trust the first proxy (essential for IP detection)

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use('/api/auth', authRoutes);

app.use(securityMiddleware);

app.get('/', (req, res) => {
  logger.info('Received a request to the root endpoint');
  res.status(200).send('Hello From Acquisitions API!');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime() 
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Acquisitions API is running!' });
});



export default app;
