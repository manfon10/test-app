const boom = require("@hapi/boom");

const MenuSlug = require("../models/menu-slug.model");
const permissionService = require("./permission.service");
const userService = require("./user.service");

const slugService = {
  createMenuSlug: async (data) => {
    const slug = await MenuSlug.create(data);

    return slug;
  },

  findMenuSlug: async (filters) => {
    const slug = await MenuSlug.findOne({
      attributes: ["id", "name", "slug", "slug_root", "icon"],
      where: filters,
    });

    if (!slug) {
      throw boom.badRequest("Slug does not exist");
    }

    return slug;
  },

  findMenuSlugs: async () => {
    const slugs = await MenuSlug.findAll({
      attributes: ["id", "name", "slug", "slug_root", "icon"],
    });

    return slugs;
  },

  findSlugsLogin: async (filters) => {
    const slugsRol = await permissionService.findFilterPermissions({
      rol_id: filters.rol_id,
    });

    let resultUser = [];

    const slugsUser = await userService.findSlugsByUser({
      user_id: filters.user_id,
    });

    slugsUser.map((slugUser) => {
      resultUser.push({
        menu_slug_id: slugUser.Permission.menu_slug_id,
        menu_slug: slugUser.Permission.menu_slug,
      });
    });

    return [...slugsRol, ...resultUser];
  },
};

module.exports = slugService;
