const boom = require("@hapi/boom");

const Rol = require("../models/rol.model");

const rolService = {
  /**
   * Create an rol
   * @param { Object } data - Rol data
   * @returns { Object } Rol data created
   */

  createRol: async (data) => {
    const rol = await Rol.create(data);

    return rol;
  },

  /**
   * Delete an rol
   * @param { Object } filters - filters
   * @returns { Object } Affected rows
   */

  deleteRol: async (filters) => {
    await rolService.findRol(filters);

    return Rol.destroy({ where: filters });
  },

  /**
   * Get rols
   * @returns { Array } Roles
   */

  findAllRols: async () => {
    const rols = await Rol.findAll({
      attributes: ["id", "name"],
    });

    return rols;
  },

  /**
   * Get rol
   * @param { Object } filters - filters
   * @returns { Object } Rol
   */

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

  /**
   * Update an rol
   * @param { Object } data - Rol data to update
   * @param { Object } filters - filters
   * @returns { Object } Rol updated
   */

  updateRol: async (data, filters) => {
    await Rol.update(data, { where: filters });

    return await rolService.findRol(filters);
  },
};

module.exports = rolService;
