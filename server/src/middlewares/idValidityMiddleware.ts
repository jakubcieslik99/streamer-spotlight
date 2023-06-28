import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';
import { UNPROCESSABLE_ENTITY } from '../constants/errorMessages';

const isValidId = (id: string) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.params) return next(createError(422, UNPROCESSABLE_ENTITY));
  if (id !== null) if (!isValidObjectId(eval('req.params.' + id))) return next(createError(422, UNPROCESSABLE_ENTITY));

  return next();
};

export { isValidId };
