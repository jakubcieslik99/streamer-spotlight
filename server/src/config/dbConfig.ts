import { Application } from 'express';
import mongoose from 'mongoose';
import { env } from './envConfig.js';
import { log } from './loggerConfig.js';

export const dbConnect = async (app: Application) => {
  mongoose.connection.on('connected', () => log.info('MongoDB connection established'));
  mongoose.connection.on('disconnected', () => log.warn('MongoDB connection dropped'));

  try {
    const URI = `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DB}`;
    await mongoose.connect(URI);
    app.emit('ready');
  } catch (error) {
    log.error(error);
  }
};
