const boom = require("@hapi/boom");
const MenuSlug = require("../models/menu-slug.model");

const Permission = require("../models/permission.model");
const Rol = require("../models/rol.model");

const generateSlug = require("../utils/generate-slug.util");

const permissionService = {
  createPermission: async (data) => {
    const slug = permissionService.generateSlugPermission(data.name);

    const permission = await Permission.create({ slug, ...data });

    return permission;
  },

  deletePermission: async (filters) => {
    await permissionService.findPermission(filters);

    return Permission.destroy({ where: filters });
  },

  generateSlugPermission: (slug) => {
    return generateSlug(slug);
  },

  findPermission: async (filters) => {
    const permission = await Permission.findOne({
      attributes: ["id", "name", "slug"],
      where: filters,
    });

    if (!permission) {
      throw boom.badRequest("Permission does not exist");
    }

    return permission;
  },

  findFilterPermissions: async (filters) => {
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

  findPermissions: async () => {
    const permissions = await Permission.findAll({
      include: [
        {
          model: Rol,
          as: "rol",
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

  updatePermission: async (data, filters) => {
    const slug = permissionService.generateSlugPermission(data.name);

    await Permission.update({ slug, ...data }, { where: filters });

    return await permissionService.findPermission(filters);
  },
};

module.exports = permissionService;
