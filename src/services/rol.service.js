const boom = require("@hapi/boom");

const Rol = require("../models/rol.model");

const rolService = {
  createRol: async (data) => {
    const rol = await Rol.create(data);

    return rol;
  },

  findAllRols: async () => {
    const rols = await Rol.findAll({
      attributes: ["id", "name"],
    });

    return rols;
  },

  findRol: async (filters) => {
    const rol = await Rol.findOne({
      attributes: ["id", "name"],
      where: filters,
    });

    if (!rol) {
      throw boom.badRequest("Rol does not exist");
    }

    return rol;
  },

  deleteRol: async (filters) => {
    await rolService.findRol(filters);

    return Rol.destroy({ where: filters });
  },

  updateRol: async (data, filters) => {
    await Rol.update(data, { where: filters });

    return await rolService.findRol(filters);
  },
};

module.exports = rolService;
