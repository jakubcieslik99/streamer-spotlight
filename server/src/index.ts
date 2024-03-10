import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import createError from 'http-errors';
import { env } from './config/envConfig.js';
import { dbConnect } from './config/dbConfig.js';
import { corsOptions } from './config/corsConfig.js';
import { rateLimiter, speedLimiter } from './config/limiterConfig.js';
import { log } from './config/loggerConfig.js';
import { isError } from './middlewares/errorMiddleware.js';
import { RESOURCE_DOES_NOT_EXIST } from './constants/errorMessages.js';
import streamersRoute from './routes/streamersRoute.js';

const app = express();
app.set('trust proxy', `loopback, ${env.HOST}`);
dbConnect(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimit(rateLimiter));
app.use(slowDown(speedLimiter));

app.use('/', streamersRoute);
app.all('*', (_req, _res, next) => next(createError(404, RESOURCE_DOES_NOT_EXIST)));

app.use(isError);

app.on('ready', () => {
  app.listen(env.PORT, () => log.info(`Server started on port ${env.PORT}`));
});
