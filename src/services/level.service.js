const boom = require("@hapi/boom");

const Level = require("../models/level.model");

const levelService = {
  createLevel: async (data) => {
    return await Level.create(data);
  },

  deleteLevel: async (filters) => {
    await levelService.findLevel(filters);

    return await Level.destroy({ where: filters });
  },

  findLevels: async () => {
    const areas = await Level.findAll({
      attributes: ["id", "name"],
    });

    return areas;
  },

  findLevel: async (filters) => {
    const area = await Level.findOne({
      attributes: ["id", "name"],
      where: filters,
    });

    if (!area) {
      throw boom.badRequest("Level does not exist");
    }

    return area;
  },

  updateLevel: async (data, filters) => {
    await levelService.findLevel(filters);

    return await Level.update(data, { where: filters });
  },
};

module.exports = levelService;
