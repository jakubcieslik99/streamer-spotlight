import { CorsOptions } from 'cors';
import { env } from './envConfig.js';

const allowedOrigins = [env.APP_URL, env.API_URL];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
  credentials: true,
  maxAge: 900,
};
