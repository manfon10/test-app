import { NextFunction, Response } from "express";

import boom from "@hapi/boom";
import { Schema } from "joi";

import { IValidatorHandlerRequest } from "../types/middlewares/validator.type";

const validatorHandler = (schema: Schema, property: string) => {
  return (req: IValidatorHandlerRequest, _: Response, next: NextFunction) => {
    const data = req[property];

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error as unknown as string));
    }

    next();
  };
};

export = validatorHandler;
