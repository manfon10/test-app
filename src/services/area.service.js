const boom = require("@hapi/boom");

const AreaManager = require("../models/area-manager.model");
const Area = require("../models/area.model");
const User = require("../models/user.model");

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
      include: {
        model: AreaManager,
        as: "area_manager",
        include: {
          model: User,
          attributes: ["id"],
        },
      },
      where: filters,
    });

    const areasPromise = areas.map(async (area) => {
      if (area.area_manager.length >= 1) {
        let managers = [];

        const managerPromise = area.area_manager.map(async (areaManager) => {
          const manager = await userService.findUser({
            id: areaManager.user_id,
          });

          managers.push(manager);
        });

        areasResult.push({
          ...area.dataValues,
          area_manager: managers,
        });

        await Promise.all(managerPromise);
      } else {
        delete area.dataValues.area_manager;

        areasResult.push({
          ...area.dataValues,
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
    let areasResult = [];

    const area = await Area.findOne({
      attributes: ["id", "name"],
      include: {
        model: AreaManager,
        as: "area_manager",
        include: {
          model: User,
          attributes: ["id"],
        },
      },
      where: filters,
    });

    if (!area) {
      throw boom.badRequest("Area does not exist");
    }

    let managers = [];

    if (area.area_manager.length >= 1) {
      const managerPromise = area.area_manager.map(async (areaManager) => {
        const manager = await userService.findUser({
          id: areaManager.user_id,
        });

        delete manager.password;

        managers.push(manager);
      });

      areasResult.push({
        ...area.dataValues,
        area_manager: managers,
      });

      await Promise.all(managerPromise);
    } else {
      delete area.dataValues.area_manager;

      areasResult.push({
        ...area.dataValues,
      });
    }

    return areasResult;
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
