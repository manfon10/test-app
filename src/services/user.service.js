const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");

const Rol = require("../models/rol.model");
const User = require("../models/user.model");

const Email = require("../utils/email.util");

const userService = {
  create: async (data) => {
    const password = Math.random().toString(36).substring(0, 10);

    const passwordHash = await bcrypt.hash(password, 10);

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

  findUser: async (filters) => {
    const user = await User.findOne({
      include: [
        {
          model: Rol,
          as: "rol",
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "names", "surnames", "email", "password"],
      where: filters,
    });

    if (!user) {
      throw boom.badRequest("Email does not exist");
    }

    return user;
  },
};

module.exports = userService;
