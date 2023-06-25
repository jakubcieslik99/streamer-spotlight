import dotenv from 'dotenv';

dotenv.config();

export const env = {
  ENV: process.env.ENV || 'dev',
  PORT: process.env.PORT || 3001,
  IP: process.env.IP || '127.0.0.1',
  API_URL: process.env.API_URL || 'http://localhost:3001',
  WEBAPP_URL: process.env.WEBAPP_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/streamer-spotlight',
};
