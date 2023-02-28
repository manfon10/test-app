const boom = require("@hapi/boom");

const Area = require("../models/area.model");

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
    const areas = await Area.findAll({
      attributes: ["id", "name"],
      where: filters,
    });

    if (areas.length <= 0) {
      throw boom.badRequest("Areas does not exist");
    }

    return areas;
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

    return area;
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
