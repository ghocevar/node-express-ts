import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpError } from '@/types/HttpError';

export const errorHandler: ErrorRequestHandler = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
  }

  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).json({
    status: 'error',
    message,
  });
};
