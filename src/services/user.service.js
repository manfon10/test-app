const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");

const Rol = require("../models/rol.model");
const Permission = require("../models/permission.model");
const UserPermission = require("../models/user-permission.model");
const User = require("../models/user.model");
const MenuSlug = require("../models/menu-slug.model");
const Level = require("../models/level.model");
const Area = require("../models/area.model");
const Branch = require("../models/branch.model");
const Company = require("../models/company.model");

const Email = require("../utils/email.util");

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

  createUser: async (data) => {
    const password = Math.random().toString(36).substring(0, 10);

    const passwordHash = await bcrypt.hash(password, 10);

    const userCreate = await User.create({ ...data, password: passwordHash });

    if (userCreate) {
      await new Email(data.email).sendWelcome({
        names: data.names,
        surnames: data.surnames,
        password,
        email: data.email,
      });
    }

    const user = await userService.findUser({ id: userCreate.id });

    delete user.dataValues.password;

    return user;
  },

  deleteUser: async (filters) => {
    await userService.findUser(filters);

    return User.destroy({ where: filters });
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
        {
          model: Branch,
          as: "branch",
          attributes: [
            "id",
            "address",
            "city",
            "state",
            "postal_code",
            "email_contact",
            "phone",
            "email_administrator",
            "country",
          ],
          include: {
            model: Company,
            as: "company",
            attributes: ["id", "name", "rfc"],
          },
        },
      ],
      attributes: ["id", "names", "surnames", "email", "password"],
      where: filters,
    });

    if (!user) {
      throw boom.badRequest("User does not exist");
    }

    return user;
  },

  findUsers: async (filters) => {
    const users = await User.findAll({
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
        {
          model: Branch,
          as: "branch",
          attributes: [
            "id",
            "address",
            "city",
            "state",
            "postal_code",
            "email_contact",
            "phone",
            "email_administrator",
            "country",
          ],
          include: {
            model: Company,
            as: "company",
            attributes: ["id", "name", "rfc"],
          },
        },
      ],
      attributes: ["id", "names", "surnames", "email", "password"],
      where: filters,
    });

    return users;
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

  /**
   * @param { Number } filters.permission_id - Permission Id
   * @param { Number } filters.user_id - User Id
   * @returns { Object } Permissions by user
   */

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

  updateUser: async (data, filters) => {
    await User.update(data, { where: filters });

    return userService.findUser(filters);
  },

  validateUserPermission: async (filters) => {
    const permission = await UserPermission.findOne({
      where: filters,
    });

    return permission;
  },
};

module.exports = userService;
