const boom = require("@hapi/boom");
const MenuSlug = require("../models/menu-slug.model");

const Permission = require("../models/permission.model");
const Rol = require("../models/rol.model");

const generateSlug = require("../utils/generate-slug.util");

const permissionService = {
  /**
   * Create an permission
   * @param { Object } data - Permission data
   * @returns { Object } Permission data created
   */

  createPermission: async (data) => {
    const slug = permissionService.generateSlugPermission(data.name);

    const permissionCreate = await Permission.create({ slug, ...data });

    const permission = await permissionService.permissionValidation({
      id: permissionCreate.id,
    });

    return permission;
  },

  /**
   * Delete an permission
   * @param { Object } filters - filters
   * @returns { Object } Affected rows
   */

  deletePermission: async (filters) => {
    await permissionService.permissionValidation(filters);

    return Permission.destroy({ where: filters });
  },

  /**
   * Generate slug for permission slug.
   * @param { String } slug - String to converter slug
   * @returns { String } Slug
   */

  generateSlugPermission: (slug) => {
    return generateSlug(slug);
  },

  /**
   * Find slugs with permission
   * @param { Object } filters - filters
   * @returns { Array } Slugs menu
   */

  findSlugsByPermission: async (filters) => {
    const permissions = await Permission.findAll({
      include: {
        model: MenuSlug,
        as: "menu_slug",
        attributes: ["name", "slug", "slug_root", "icon"],
      },
      attributes: ["menu_slug_id", "id", "name", "slug"],
      where: filters,
    });

    return permissions;
  },

  /**
   * Get All Permisions
   * @returns { Array } Permissions
   */

  findPermissions: async () => {
    const permissions = await Permission.findAll({
      include: [
        {
          model: Rol,
          attributes: ["id", "name"],
        },
        {
          model: MenuSlug,
          as: "menu_slug",
          attributes: ["id", "name", "slug", "slug_root", "icon"],
        },
      ],
      attributes: ["id", "name", "slug"],
    });

    return permissions;
  },

  /**
   * Permission validation
   * @param { Object } filters - filters
   * @returns { Object } Permission
   */

  permissionValidation: async (filters) => {
    const permission = await Permission.findOne({
      include: [
        {
          model: Rol,
          attributes: ["id", "name"],
        },
        {
          model: MenuSlug,
          as: "menu_slug",
          attributes: ["id", "name", "slug", "slug_root", "icon"],
        },
      ],
      attributes: ["id", "name", "slug"],
      where: filters,
    });

    if (!permission) {
      throw boom.badRequest("Permission does not exist");
    }

    return permission;
  },

  /**
   * Update an permission
   * @param { Object } data - Permission data to update
   * @param { Object } filters - filters
   * @returns { Object } Permission updated
   */

  updatePermission: async (data, filters) => {
    const slug = permissionService.generateSlugPermission(data.name);

    await Permission.update({ slug, ...data }, { where: filters });

    return await permissionService.permissionValidation(filters);
  },
};

module.exports = permissionService;
