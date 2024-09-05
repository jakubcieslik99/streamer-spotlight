import dotenv from 'dotenv';

dotenv.config();

export const env = {
  ENV: process.env.ENV || 'production',
  // Node.js
  HOST: process.env.HOST === 'localhost' ? '127.0.0.1' : process.env.HOST,
  PORT: process.env.PORT || 4000,
  API_URL: process.env.API_URL || 'http://localhost:4000',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  // MongoDB
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DB: process.env.MONGO_DB || 'database',
  MONGO_USER: process.env.MONGO_USER || 'root',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'Passw0rd!',
};
