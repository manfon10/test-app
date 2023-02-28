const boom = require("@hapi/boom");

const MenuSlug = require("../models/menu-slug.model");
const permissionService = require("./permission.service");
const userService = require("./user.service");

const slugService = {
  /**
   * Create an MenuSlug
   * @param { Object } data - MenuSlug data
   * @returns { Object } MenuSlug data created
   */

  createMenuSlug: async (data) => {
    const slug = await MenuSlug.create(data);

    return slug;
  },

  /**
   * Get MenuSlug
   * @param { Object } filters - filters
   * @returns { Array } MenuSlug
   */

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

  /**
   * Get MenuSlugs
   * @returns { Array } MenuSlug
   */

  findMenuSlugs: async () => {
    const slugs = await MenuSlug.findAll({
      attributes: ["id", "name", "slug", "slug_root", "icon"],
    });

    return slugs;
  },

  /**
   * Find slugs by rol_id and user_id
   * @param { Object } filters.rol_id - Rol id
   * @param { Object } filters.user_id - User id
   * @returns { Array } Slugs menu to rol or user
   */

  findSlugsLogin: async (filters) => {
    const slugsRol = await permissionService.findSlugsByPermission({
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
