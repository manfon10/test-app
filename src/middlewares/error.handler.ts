import { NextFunction, Request, Response } from "express";

import { ValidationError } from "sequelize";

export const errorHandler = (
  err: any,
  __: Request,
  res: Response,
  _: NextFunction
) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export const boomErrorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

export const ormErrorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
};
