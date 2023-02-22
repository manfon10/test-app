const permissionService = require("./permission.service");

const slugService = {
  findByRol: async (rol_id) => {
    const slugs = await permissionService.findFilterPermissions({ rol_id });

    return slugs;
  },
};

module.exports = slugService;
