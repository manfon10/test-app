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

const findPermissionById = async (req, res, next) => {
  try {
    const id = req.params;

    const permission = await permissionService.findPermission(id);

    res.status(200).json({ permission });
  } catch (error) {
    next(error);
  }
};

const findAllPermissions = async (_, res, next) => {
  try {
    const permissions = await permissionService.findPermissions();

    res.status(200).json({ permissions });
  } catch (error) {
    next(error);
  }
};

const deletePermissionByid = async (req, res, next) => {
  try {
    const id = req.params;

    await permissionService.deletePermission(id);

    res.status(201).json({ message: "Permission deleted!" });
  } catch (error) {
    next(error);
  }
};

const updatePermissionById = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;

    const permission = await permissionService.updatePermission(body, id);

    res.status(201).json({ message: "Permission updated!", permission });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPermission,
  findPermissionById,
  findAllPermissions,
  deletePermissionByid,
  updatePermissionById,
};
