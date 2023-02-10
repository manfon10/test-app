import "dotenv/config";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import boom from "@hapi/boom";

import { IAuthData, ILoginData } from "../types/services/auth.type";

import { userService } from "./user.service";

export const authService = {
  login: async (data: ILoginData) => {
    const user = await userService.findByEmail(data.email);

    if (
      !user ||
      (user.password &&
        !(await authService.comparePassword(data.password, user.password)))
    ) {
      throw boom.unauthorized("Invalid credentials");
    }

    delete user.dataValues.password;

    return {
      user,
      ...authService.generateAuthData(user),
    };
  },

  comparePassword: (
    password: string,
    passwordHash: string
  ): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash);
  },

  decodedToken: (token: string): jwt.JwtPayload | string => {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  },

  generateToken: (data: IAuthData): string => {
    return jwt.sign(data, `${process.env.JWT_SECRET}`, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },

  generateAuthData: (userData: any) => {
    const user = { id: userData.id };
    return {
      token: authService.generateToken(user),
    };
  },

  hashPassword: async (password: string) => {
    return await bcrypt.hash(password, 10);
  },
};
