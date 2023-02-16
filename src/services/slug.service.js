const MenuSlug = require("../models/menu-slug.model");
const Permission = require("../models/permission.model");

const slugService = {
  findByRol: async (rol_id) => {
    const slugs = await Permission.findAll({
      include: {
        model: MenuSlug,
        as: "menu_slug",
        attributes: ["name", "slug", "icon"],
      },
      attributes: ["menu_slug_id"],
      where: { rol_id },
    });

    return slugs;
  },
};

module.exports = slugService;
