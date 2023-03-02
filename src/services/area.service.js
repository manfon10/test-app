const boom = require("@hapi/boom");

const AreaManager = require("../models/area-manager.model");
const Area = require("../models/area.model");

const userService = require("./user.service");

const areaService = {
  /**
   * Create an area
   * @param { Object } data - Area data
   * @returns { Object } Area data created
   */

  createArea: async (data) => {
    const createArea = await Area.create(data);

    return await areaService.findArea({ id: createArea.id });
  },

  /**
   * Delete an area
   * @param { Object } filters - filters
   * @returns { Object } Affected rows
   */

  deleteArea: async (filters) => {
    await areaService.findArea(filters);

    return await Area.destroy({ where: filters });
  },

  /**
   * Get areas
   * @param { Object } filters - filters
   * @returns { Array } Areas
   */

  findAreas: async (filters) => {
    let areasResult = [];

    const areas = await Area.findAll({
      attributes: ["id", "name"],
      where: filters,
    });

    if (areas.length <= 0) {
      throw boom.badRequest("Areas does not exist");
    }

    const areasPromise = areas.map(async (area) => {
      const managersArea = await areaService.findManagersArea({
        area_id: area.id,
      });

      areasResult.push({
        ...area.dataValues,
      });

      if (managersArea.length >= 1) {
        const managersAreaPromise = managersArea.map(async (managerArea) => {
          const user = await userService.findUser({ id: managerArea.user_id });

          delete user.dataValues.password;

          return user;
        });

        const manager = await Promise.all(managersAreaPromise);

        areasResult.push({
          ...area.dataValues,
          area_manager: manager,
        });
      }
    });

    await Promise.all(areasPromise);

    return areasResult;
  },

  /**
   * Get area
   * @param { Object } filters - filters
   * @returns { Object } Area
   */

  findArea: async (filters) => {
    const area = await Area.findOne({
      attributes: ["id", "name"],
      where: filters,
    });

    if (!area) {
      throw boom.badRequest("Area does not exist");
    }

    const managersArea = await areaService.findManagersArea({
      area_id: parseInt(filters.id),
    });

    let managerResult = {};

    if (managersArea.length >= 1) {
      const managerPromise = managersArea.map(async (managerArea) => {
        const user = await userService.findUser({ id: managerArea.user_id });

        delete user.dataValues.password;

        return user;
      });

      const manager = await Promise.all(managerPromise);

      managerResult.manager_area = manager;
    }

    return { ...area.dataValues, ...managerResult };
  },

  /**
   * Get manager to area
   * @param { Object } filters - filters
   * @returns { Object } Manager area
   */

  findManagersArea: async (filters) => {
    return await AreaManager.findAll({ where: filters });
  },

  /**
   * Update an area
   * @param { Object } data - Area data to update
   * @param { Object } filters - filters
   * @returns { Object } Area updated
   */

  updateArea: async (data, filters) => {
    await Area.update(data, { where: filters });

    return await areaService.findArea(filters);
  },
};

module.exports = areaService;
