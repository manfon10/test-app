const levelService = require("../services/level.service");

const findAllLevels = async (_, res, next) => {
  try {
    const levels = await levelService.findLevels();

    res.status(200).json({ levels });
  } catch (error) {
    next(error);
  }
};

const findLevelById = async (req, res, next) => {
  try {
    const id = req.params;

    const level = await levelService.findLevel(id);

    res.status(200).json({ level });
  } catch (error) {
    next(error);
  }
};

const createLevel = async (req, res, next) => {
  try {
    const body = req.body;

    const newLevel = await levelService.createLevel(body);

    res.status(201).json({ newLevel });
  } catch (error) {
    next(error);
  }
};

const deleteLevel = async (req, res, next) => {
  try {
    const id = req.params;

    await levelService.deleteLevel(id);

    res.status(201).json({ message: "Level deleted" });
  } catch (error) {
    next(error);
  }
};

const updateLevel = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;

    await levelService.updateLevel(body, id);

    res.status(201).json({ message: "Level updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLevel,
  deleteLevel,
  findAllLevels,
  findLevelById,
  updateLevel,
};
