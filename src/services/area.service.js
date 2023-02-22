const boom = require("@hapi/boom");

const Area = require("../models/area.model");

const areaService = {
  createArea: async (data) => {
    return await Area.create(data);
  },

  deleteArea: async (filters) => {
    await areaService.findArea(filters);

    return await Area.destroy({ where: filters });
  },

  findAreas: async () => {
    const areas = await Area.findAll({
      attributes: ["id", "name"],
    });

    return areas;
  },

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

  updateArea: async (data, filters) => {
    await Area.update(data, { where: filters });

    return await areaService.findArea(filters);
  },
};

module.exports = areaService;
