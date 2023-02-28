const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { filterUniqueValues } = require("../utils/array.util");

const slugService = require("./slug.service");
const userService = require("./user.service");

const authService = {
  /**
   * Compare a password
   * @param { String } password - Unencrypted password
   * @param { String } passwordHash - Encrypted password
   * @returns { Boolean } Boolean
   */

  comparePassword: (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
  },

  /**
   * Decode token
   * @param { String } token - Token
   * @returns { Object } Data decoded
   */

  decodedToken: (token) => {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  },

  /**
   * Generate data encoded in a token
   * @param { Object } userData - User data to decoded
   * @returns { Object } Token encoded
   */

  generateAuthData: (userData) => {
    const user = { id: userData.id };
    return {
      token: authService.generateToken(user),
    };
  },

  /**
   * Generate token
   * @param { Object } data - User data to decoded
   * @returns { Object } Data encoded
   */

  generateToken: (data) => {
    return jwt.sign(data, `${process.env.JWT_SECRET}`, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },

  /**
   * Hash password
   * @param { String } password - Password to hash
   * @returns { String } Password hashed
   */

  hashPassword: async (password) => {
    return await bcrypt.hash(password, 10);
  },

  /**
   * Login function
   * @param { String } data.email - Email to user
   * @param { String } data.password - Password to user
   * @returns { Object } Data user login
   */

  login: async (data) => {
    const user = await userService.findUser({ email: data.email });

    if (
      !user ||
      !(await authService.comparePassword(data.password, user.password))
    ) {
      throw boom.badRequest("Wrong credentials");
    }

    delete user.dataValues.password;

    let menu_slugs = [];

    const slugsFilter = await slugService.findSlugsLogin({
      rol_id: user.rol.id,
      user_id: user.id,
    });

    slugsFilter.map((slugFilter) => {
      menu_slugs.push({
        menu_slug_id: slugFilter.menu_slug_id,
        menu_slug: {
          name: slugFilter.menu_slug.name,
          slug: `/${slugFilter.menu_slug.slug_root}/${slugFilter.menu_slug.slug}`,
          icon: slugFilter.menu_slug.icon,
        },
      });
    });

    return {
      user,
      menu_slugs: [...filterUniqueValues(menu_slugs)],
      ...authService.generateAuthData(user),
    };
  },
};

module.exports = authService;
