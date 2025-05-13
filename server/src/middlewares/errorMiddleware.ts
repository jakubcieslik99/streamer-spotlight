import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import { env } from '../config/envConfig.js';
import { log } from '../config/loggerConfig.js';
import { SERVER_ERROR, UNPROCESSABLE_ENTITY } from '../constants/errorMessages.js';

export const errorHandler = (controller: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(controller(req, res, next)).catch(next);

export const isError = (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  //[INFO] Internal error handling
  if (!error.status && !error.isJoi) {
    log.error(`INTERNAL - ${error.stack || error.message || 'Internal error.'}`);
    res.status(500).send({ message: SERVER_ERROR });
  }

  //[INFO] Server error handling
  if (error.status >= 500) {
    log.error(`SERVER - 500: ${error.status}: ${error.stack || error.message}`);
    res.status(500).send({ message: SERVER_ERROR });
  }

  //[INFO] Client validation error handling
  if (error.isJoi) {
    env.ENV !== 'production' && log.error(`CLIENT - 422: ${UNPROCESSABLE_ENTITY}`);
    res.status(422).send({ message: UNPROCESSABLE_ENTITY });
  }

  //[INFO] Any other client error handling
  env.ENV !== 'production' && log.error(`CLIENT - ${error.status}: ${error.message || SERVER_ERROR}`);
  res.status(error.status).send({ message: error.message || SERVER_ERROR });
};
