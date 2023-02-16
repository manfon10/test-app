const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { filterUniqueValues } = require("../utils/array.util");

const slugService = require("./slug.service");
const userService = require("./user.service");

const authService = {
  login: async (data) => {
    const user = await userService.findUser({ email: data.email });

    if (
      !user ||
      !(await authService.comparePassword(data.password, user.password))
    ) {
      throw boom.badRequest("Wrong credentials");
    }

    delete user.dataValues.password;

    const slugsFilter = await slugService.findByRol(user.rol.id);

    return {
      user,
      menu_slugs: [...filterUniqueValues(slugsFilter)],
      ...authService.generateAuthData(user),
    };
  },

  hashPassword: async (password) => {
    return await bcrypt.hash(password, 10);
  },

  comparePassword: (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
  },

  decodedToken: (token) => {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  },

  generateToken: (data) => {
    return jwt.sign(data, `${process.env.JWT_SECRET}`, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },

  generateAuthData: (userData) => {
    const user = { id: userData.id };
    return {
      token: authService.generateToken(user),
    };
  },
};

module.exports = authService;
