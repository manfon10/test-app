const Router = require("express");

const {
  getAllAreas,
  getAreaById,
  createArea,
  deleteArea,
  updateArea,
} = require("../controllers/area.controller");

const { filterAreaByParamsDto, createAreaDto } = require("../dtos/area.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_areas"), getAllAreas);

router.get(
  "/:id",
  checkPermissions("visualizar_area"),
  validatorHandler(filterAreaByParamsDto, "params"),
  getAreaById
);

router.delete(
  "/:id",
  checkPermissions("eliminar_area"),
  validatorHandler(filterAreaByParamsDto, "params"),
  deleteArea
);

router.patch(
  "/:id",
  checkPermissions("actualizar_area"),
  validatorHandler(filterAreaByParamsDto, "params"),
  updateArea
);

router.post(
  "/",
  checkPermissions("crear_area"),
  validatorHandler(createAreaDto, "body"),
  createArea
);

module.exports = router;
