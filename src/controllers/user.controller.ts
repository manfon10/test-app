import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newUser = await userService.create(body);

    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
};
