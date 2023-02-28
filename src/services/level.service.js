const boom = require("@hapi/boom");

const Level = require("../models/level.model");

const levelService = {
  /**
   * Create an level
   * @param { Object } data - Level data
   * @returns { Object } Level data created
   */

  createLevel: async (data) => {
    return await Level.create(data);
  },

  /**
   * Delete an level
   * @param { Object } filters - filters
   * @returns { Object } Affected rows
   */

  deleteLevel: async (filters) => {
    await levelService.findLevel(filters);

    return await Level.destroy({ where: filters });
  },

  /**
   * Get levels
   * @param { Object } filters - filters
   * @returns { Array } Levels
   */

  findLevels: async () => {
    const areas = await Level.findAll({
      attributes: ["id", "name"],
    });

    return areas;
  },

  /**
   * Get level
   * @param { Object } filters - filters
   * @returns { Object } Level
   */

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

  /**
   * Update an level
   * @param { Object } data - Level data to update
   * @param { Object } filters - filters
   * @returns { Object } Level updated
   */

  updateLevel: async (data, filters) => {
    await Level.update(data, { where: filters });

    return await levelService.findLevel(filters);
  },
};

module.exports = levelService;
