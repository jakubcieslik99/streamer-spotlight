import { Application } from 'express';
import mongoose from 'mongoose';
import { env } from './envConfig';
import { log } from './loggerConfig';

export const dbConnect = async (app: Application) => {
  mongoose.connection.on('connected', () => log.info('MongoDB connection established'));
  mongoose.connection.on('disconnected', () => log.warn('MongoDB connection dropped'));

  try {
    await mongoose.connect(env.MONGODB_URI);
    app.emit('ready');
  } catch (error) {
    log.error(error);
  }
};
