import { NextFunction, Request, Response } from "express";
import { cookieResponse } from "../middlewares/cookie.handler";
import { authService } from "../services/auth.service";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const responseLogin = await authService.login(body);

    return cookieResponse(res, { ...responseLogin });
  } catch (error) {
    next(error);
  }
};
