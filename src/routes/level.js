const Router = require("express");

const {
  createLevel,
  deleteLevel,
  findAllLevels,
  findLevelById,
  updateLevel,
} = require("../controllers/level.controller");

const { createLevelDto, filterLevelByParamsDto } = require("../dtos/level.dto");

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

// Routes super admin

// Find All Areas

router.get("/", findAllLevels);

// Find area by id

router.get(
  "/:id",
  validatorHandler(filterLevelByParamsDto, "params"),
  findLevelById
);

// Create area

router.post("/", validatorHandler(createLevelDto, "body"), createLevel);

// Delete area by id

router.delete(
  "/:id",
  validatorHandler(filterLevelByParamsDto, "params"),
  deleteLevel
);

// Update area by id

router.patch(
  "/:id",
  validatorHandler(filterLevelByParamsDto, "params"),
  updateLevel
);

module.exports = router;
