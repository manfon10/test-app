const boom = require("@hapi/boom");
const bcrypt = require("bcryptjs");

const Rol = require("../models/rol.model");
const Permission = require("../models/permission.model");
const UserPermission = require("../models/user-permission.model");
const User = require("../models/user.model");
const Level = require("../models/level.model");
const Area = require("../models/area.model");
const Branch = require("../models/branch.model");
const Company = require("../models/company.model");
const AreaManager = require("../models/area-manager.model");

const Email = require("../utils/email.util");

const userService = {
  /**
   * Assign area manager
   * @param { Object } data - User data to area manager
   * @returns { Object } Data created
   */

  assignAreaManager: async (data) => {
    return await AreaManager.create(data);
  },

  /**
   * Assign a permission to a user
   * @param { Number } data.user_id - User id
   * @param { Number } data.permission_id - Permission id
   * @returns { Object } Permissions data
   */

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

  /**
   * Create a user
   * @param { Object } data - User data
   * @returns { Object } User data created
   */

  createUser: async (data) => {
    const password = Math.random().toString(36).substring(0, 10);

    const passwordHash = await bcrypt.hash(password, 10);

    const userCreate = await User.create({ ...data, password: passwordHash });

    if (data.is_manager) {
      await userService.assignAreaManager({
        user_id: userCreate.id,
        area_id: data.area_id,
      });
    }

    if (userCreate) {
      await new Email(data.email).sendWelcome({
        names: data.names,
        surnames: data.surnames,
        password,
        email: data.email,
      });
    }

    const user = await userService.findUser({ id: userCreate.id });

    delete user.password;

    return user;
  },

  /**
   * Delete a user
   * @param { Object } filters - Filters data
   * @returns { Number } Affected rows
   */

  deleteUser: async (filters) => {
    await userService.findUser(filters);

    return User.destroy({ where: filters });
  },

  /**
   * Delete a user to manaer area
   * @param { Object } filters - Filters data
   * @returns { Number } Affected rows
   */

  deleteUserAreaManager: async (filters) => {
    return await AreaManager.destroy({ where: filters });
  },

  /**
   * Get a user
   * @param { Object } filters - Filters data
   * @returns { Object } User data
   */

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
      attributes: [
        "id",
        "names",
        "surnames",
        "email",
        "password",
        "is_first_login",
      ],
      where: filters,
    });

    if (!user) {
      throw boom.badRequest("User does not exist");
    }

    const isManager = await AreaManager.findOne({
      where: { user_id: user.id },
    });

    return { ...user.dataValues, is_manager: isManager ? true : false };
  },

  /**
   * Get a users
   * @param { Object } filters - Filters data
   * @returns { Array } Users data
   */

  findUsers: async (filters) => {
    let usersResult = [];

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
      attributes: ["id", "names", "surnames", "email", "is_first_login"],
      where: filters,
    });

    const isManagerPromise = users.map(async (user) => {
      const isManager = await AreaManager.findOne({
        where: { user_id: user.id },
      });

      usersResult.push({
        ...user.dataValues,
        is_manager: isManager ? true : false,
      });
    });

    await Promise.all(isManagerPromise);

    return usersResult;
  },

  /**
   * Get slugs depending on user permission
   * @param { Object } filters.user_id - User id
   * @returns { Array } Slugs data
   */

  findSlugsByUser: async (filters) => {
    const slugs = await UserPermission.findAll({
      attributes: ["id"],
      where: { user_id: filters.user_id },
    });

    return slugs;
  },

  /**
   * Filter the permissions of a user
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

  /**
   * Update a user
   * @param { Object } data - Data to update
   * @param { Object } filters - Filters
   * @returns { Object } Updated user
   */

  updateUser: async (data, filters) => {
    if (data.is_manager) {
      await userService.assignAreaManager({
        user_id: filters.id,
        area_id: data.area_id,
      });
    } else {
      await userService.deleteUserAreaManager({ user_id: filters.id });
    }

    await User.update(data, { where: filters });

    return userService.findUser(filters);
  },

  /**
   * Update password a user
   * @param { Object } data - Data new password
   * @param { Object } filters - Filters
   * @returns { Object } Updated user password
   */

  updatePassword: async (data, filters, is_forgot = false) => {
    const user = await userService.findUser(filters);

    if (!is_forgot) {
      const passwordCompare = await bcrypt.compare(
        data.current_password,
        user.password
      );

      if (!passwordCompare) {
        throw boom.badRequest("The password does not match.");
      }
    }

    const passwordHash = await bcrypt.hash(data.new_password, 10);

    return userService.updateUser(
      { password: passwordHash, is_first_login: false },
      { id: user.id }
    );
  },

  /**
   * Get permissions from a user
   * @param { Object } filters - Filters
   * @returns { Object } Permission by user
   *
   */

  validateUserPermission: async (filters) => {
    const permission = await UserPermission.findOne({
      where: filters,
    });

    return permission;
  },
};

module.exports = userService;
