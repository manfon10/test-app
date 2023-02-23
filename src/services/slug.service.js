const boom = require("@hapi/boom");

const MenuSlug = require("../models/menu-slug.model");
const permissionService = require("./permission.service");

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

  findByRol: async (rol_id) => {
    const slugs = await permissionService.findFilterPermissions({ rol_id });

    return slugs;
  },
};

module.exports = slugService;
