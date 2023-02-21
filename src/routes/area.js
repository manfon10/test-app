const Router = require("express");

const {
  findAllAreas,
  findAreaById,
  createArea,
  deleteArea,
  updateArea,
} = require("../controllers/area.controller");

const { filterAreaByParamsDto, createAreaDto } = require("../dtos/area.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

// Routes super admin

router.delete(
  "/:id",
  validatorHandler(filterAreaByParamsDto, "params"),
  deleteArea
);

router.get("/", findAllAreas);

router.get(
  "/:id",
  validatorHandler(filterAreaByParamsDto, "params"),
  findAreaById
);

router.patch(
  "/:id",
  validatorHandler(filterAreaByParamsDto, "params"),
  updateArea
);

router.post("/", validatorHandler(createAreaDto, "body"), createArea);

module.exports = router;
