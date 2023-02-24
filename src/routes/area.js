const Router = require("express");

const {
  findAllAreas,
  findAreaById,
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

router.get("/", /*checkPermissions("obtener_todas_las_areas"), */ findAllAreas);

router.get(
  "/:id",
  //checkPermissions("obtener_area_por_id"),
  validatorHandler(filterAreaByParamsDto, "params"),
  findAreaById
);

router.delete(
  "/:id",
  //checkPermissions("eliminar_area_por_id"),
  validatorHandler(filterAreaByParamsDto, "params"),
  deleteArea
);

router.patch(
  "/:id",
  //checkPermissions("actualizar_area_por_id"),
  validatorHandler(filterAreaByParamsDto, "params"),
  updateArea
);

router.post(
  "/",
  //checkPermissions("crear_area"),
  validatorHandler(createAreaDto, "body"),
  createArea
);

module.exports = router;
