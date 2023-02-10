import boom from "@hapi/boom";

import Area from "../database/models/area.model";
import Level from "../database/models/level.model";
import User from "../database/models/user.model";

import { IUserInput, IUserOutput } from "../types/models/user.type";

import { Email } from "../utils/email.util";

import { authService } from "./auth.service";

export const userService = {
  create: async (data: IUserInput): Promise<IUserOutput> => {
    const password = Math.random().toString(36).substring(0, 10);

    const passwordHash = await authService.hashPassword(password);

    const user = await User.create({ ...data, password: passwordHash });

    if (user) {
      await new Email(data.email).sendWelcome({
        names: data.names,
        surnames: data.surnames,
        password,
        email: data.email,
      });
    }

    delete user.dataValues.password;

    return user;
  },

  findByEmail: async (email: string): Promise<IUserOutput> => {
    const user = await User.findOne({
      include: [
        {
          model: Level,
          as: "level",
          attributes: ["id", "name"],
        },
        {
          model: Area,
          as: "area",
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "names", "surnames", "email"],
      where: { email },
    });

    if (!user) {
      throw boom.notFound("Email does not exist");
    }

    return user;
  },
};
