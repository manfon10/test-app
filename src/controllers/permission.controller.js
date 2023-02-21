const permissionService = require("../services/permission.service");

const createPermission = async (req, res, next) => {
  try {
    const body = req.body;

    const permission = await permissionService.createPermission(body);

    res.status(201).json({ permission });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPermission };
