import createError from 'http-errors';
import { TOO_MANY_REQUESTS } from '../constants/errorMessages';

export const rateLimiter = {
  windowMs: 30 * 1000,
  max: 30,
  handler: () => {
    throw createError(429, TOO_MANY_REQUESTS);
  },
};

export const speedLimiter = {
  windowMs: 30 * 1000,
  delayAfter: 25,
  delayMs: 200,
};
