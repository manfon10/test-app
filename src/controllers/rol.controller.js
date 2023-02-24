const rolService = require("../services/rol.service");

const createRol = async (req, res, next) => {
  try {
    const body = req.body;

    const rol = await rolService.createRol(body);

    res.status(201).json({ rol });
  } catch (error) {
    next(error);
  }
};

const findAllRols = async (_, res, next) => {
  try {
    const rols = await rolService.findAllRols();

    res.status(200).json({ rols });
  } catch (error) {
    next(error);
  }
};

const findRolById = async (req, res, next) => {
  try {
    const id = req.params;

    const rol = await rolService.findRol(id);

    res.status(200).json({ rol });
  } catch (error) {
    next(error);
  }
};

const deleteRolById = async (req, res, next) => {
  try {
    const id = req.params;

    await rolService.deleteRol(id);

    res.status(201).json({ message: "Rol deleted" });
  } catch (error) {
    next(error);
  }
};

const updateRolById = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;

    const rol = await rolService.updateRol(body, id);

    res.status(201).json({ message: "Rol updated", rol });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRol,
  findAllRols,
  findRolById,
  deleteRolById,
  updateRolById,
};
