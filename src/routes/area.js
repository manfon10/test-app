const Router = require("express");

const {
  findAllAreas,
  findAreaById,
  createArea,
  deleteArea,
  updateArea,
} = require("../controllers/area.controller");

const { filterAreaByParamsDto, createAreaDto } = require("../dtos/area.dto");

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

// Routes super admin

// Find All Areas

router.get("/", findAllAreas);

// Find area by id

router.get(
  "/:id",
  validatorHandler(filterAreaByParamsDto, "params"),
  findAreaById
);

// Create area

router.post("/", validatorHandler(createAreaDto, "body"), createArea);

// Delete area by id

router.delete(
  "/:id",
  validatorHandler(filterAreaByParamsDto, "params"),
  deleteArea
);

// Update area by id

router.patch(
  "/:id",
  validatorHandler(filterAreaByParamsDto, "params"),
  updateArea
);

module.exports = router;
