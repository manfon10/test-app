const Router = require("express");
const {
  findAllRols,
  findRolById,
  deleteRolById,
  updateRolById,
  createRol,
} = require("../controllers/rol.controller");
const { filterRolByParamsDto, createRolDto } = require("../dtos/rol.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", /* checkPermissions("obtener_todas_las_areas"), */ findAllRols);

router.get(
  "/:id",
  // checkPermissions("obtener_area_por_id"),
  validatorHandler(filterRolByParamsDto, "params"),
  findRolById
);

router.delete(
  "/:id",
  // checkPermissions("eliminar_area_por_id"),
  validatorHandler(filterRolByParamsDto, "params"),
  deleteRolById
);

router.patch(
  "/:id",
  // checkPermissions("actualizar_area_por_id"),
  validatorHandler(filterRolByParamsDto, "params"),
  updateRolById
);

router.post(
  "/",
  // checkPermissions("crear_area"),
  validatorHandler(createRolDto, "body"),
  createRol
);

module.exports = router;
