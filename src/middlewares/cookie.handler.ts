import "dotenv/config";

import { Response } from "express";

import boom from "@hapi/boom";
import { ILoginResponse } from "../types/services/auth.type";

export const cookieResponse = (res: Response, data: ILoginResponse) => {
  if (data.user) {
    return res
      .status(201)
      .cookie("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        expires: new Date(new Date().setDate(new Date().getDate() + 1)),
      })
      .json({
        ...data,
      });
  }

  throw boom.unauthorized();
};
