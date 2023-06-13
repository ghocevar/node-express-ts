import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpException } from '@errors/http';

export const errorHandler: ErrorRequestHandler = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
  }

  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).send({
    status: 'error',
    message,
  });
};
