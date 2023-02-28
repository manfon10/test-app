const areaService = require("../services/area.service");

const getAllAreas = async (req, res, next) => {
  try {
    const params = {
      branch_id: req.sessionUser.branch && req.sessionUser.branch.id,
    };

    const areas = await areaService.findAreas(params);

    res.status(200).json({ areas });
  } catch (error) {
    next(error);
  }
};

const getAreaById = async (req, res, next) => {
  try {
    const id = req.params;

    const params = {
      ...id,
      branch_id: req.sessionUser.branch && req.sessionUser.branch.id,
    };

    const area = await areaService.findArea(params);

    res.status(200).json({ area });
  } catch (error) {
    next(error);
  }
};

const createArea = async (req, res, next) => {
  try {
    const data = req.body;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const body = {
      ...data,
      branch_id,
    };

    const newArea = await areaService.createArea(body);

    res.status(201).json({ newArea });
  } catch (error) {
    next(error);
  }
};

const deleteArea = async (req, res, next) => {
  try {
    const id = req.params;

    const params = {
      ...id,
      branch_id: req.sessionUser.branch && req.sessionUser.branch.id,
    };

    await areaService.deleteArea(params);

    res.status(201).json({ message: "Area deleted" });
  } catch (error) {
    next(error);
  }
};

const updateArea = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;

    const params = {
      ...id,
      branch_id: req.sessionUser.branch && req.sessionUser.branch.id,
    };

    const area = await areaService.updateArea(body, params);

    res.status(201).json({ message: "Area updated", area });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAreas,
  getAreaById,
  createArea,
  deleteArea,
  updateArea,
};
