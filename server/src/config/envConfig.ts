import dotenv from 'dotenv';

dotenv.config();

export const env = {
  ENV: process.env.ENV || 'development',
  // Node.js
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3001,
  API_URL: process.env.API_URL || 'http://localhost:3001',
  WEBAPP_URL: process.env.WEBAPP_URL || 'http://localhost:3000',
  // MongoDB
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DB: process.env.MONGO_DB || 'database',
  MONGO_USER: process.env.MONGO_USER || 'root',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'Passw0rd!',
};
