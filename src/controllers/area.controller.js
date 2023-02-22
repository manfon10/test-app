const areaService = require("../services/area.service");

const findAllAreas = async (_, res, next) => {
  try {
    const areas = await areaService.findAreas();

    res.status(200).json({ areas });
  } catch (error) {
    next(error);
  }
};

const findAreaById = async (req, res, next) => {
  try {
    const id = req.params;

    const area = await areaService.findArea(id);

    res.status(200).json({ area });
  } catch (error) {
    next(error);
  }
};

const createArea = async (req, res, next) => {
  try {
    const body = req.body;

    const newArea = await areaService.createArea(body);

    res.status(201).json({ newArea });
  } catch (error) {
    next(error);
  }
};

const deleteArea = async (req, res, next) => {
  try {
    const id = req.params;

    await areaService.deleteArea(id);

    res.status(201).json({ message: "Area deleted" });
  } catch (error) {
    next(error);
  }
};

const updateArea = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;

    const area = await areaService.updateArea(body, id);

    res.status(201).json({ message: "Area updated", area });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllAreas,
  findAreaById,
  createArea,
  deleteArea,
  updateArea,
};
