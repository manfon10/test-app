const Permission = require("../models/permission.model");

const permissionService = {
  createPermission: async (data) => {
    const permission = await Permission.create(data);

    return permission;
  },
};

module.exports = permissionService;
