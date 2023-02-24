const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");

const Rol = require("../models/rol.model");
const Permission = require("../models/permission.model");
const UserPermission = require("../models/user-permission.model");
const User = require("../models/user.model");

const Email = require("../utils/email.util");
const MenuSlug = require("../models/menu-slug.model");
const Level = require("../models/level.model");
const Area = require("../models/area.model");

const userService = {
  assignPermission: async (data) => {
    const permissionUser = await userService.validateUserPermission({
      permission_id: data.permission_id,
      user_id: data.user_id,
    });

    if (permissionUser) {
      throw boom.notFound("User already has that permission");
    }

    return await UserPermission.create(data);
  },

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
      attributes: ["id", "names", "surnames", "email", "password"],
      where: filters,
    });

    if (!user) {
      throw boom.badRequest("Email does not exist");
    }

    return user;
  },

  findSlugsByUser: async (filters) => {
    const slugs = await UserPermission.findAll({
      attributes: ["id"],
      include: {
        attributes: ["menu_slug_id", "id", "name", "slug"],
        model: Permission,
        include: {
          as: "menu_slug",
          attributes: ["name", "slug", "slug_root", "icon"],
          model: MenuSlug,
        },
      },
      where: { user_id: filters.user_id },
    });

    return slugs;
  },

  filterPermissionByUser: async (filters) => {
    const permission = await UserPermission.findOne({
      include: [
        {
          model: Permission,
          where: { id: filters.permission_id },
        },
      ],
      where: { user_id: filters.user_id },
    });

    return permission;
  },

  validateUserPermission: async (filters) => {
    const permission = await UserPermission.findOne({
      where: filters,
    });

    return permission;
  },
};

module.exports = userService;
