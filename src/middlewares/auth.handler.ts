import "dotenv/config";

import { NextFunction, Request, Response } from "express";

import boom from "@hapi/boom";

export const checkApiKey = (req: Request, _: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey === process.env.APP_API_KEY) {
    next();
  } else {
    next(boom.unauthorized());
  }
};
