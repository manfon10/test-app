const Router = require("express");
const {
  findAllRols,
  findRolById,
  deleteRolById,
  updateRolById,
  createRol,
} = require("../controllers/rol.controller");
const { filterRolByParamsDto, createRolDto } = require("../dtos/rol.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_roles"), findAllRols);

router.get(
  "/:id",
  checkPermissions("visualizar_rol"),
  validatorHandler(filterRolByParamsDto, "params"),
  findRolById
);

router.delete(
  "/:id",
  checkPermissions("eliminar_rol"),
  validatorHandler(filterRolByParamsDto, "params"),
  deleteRolById
);

router.patch(
  "/:id",
  checkPermissions("actualizar_rol"),
  validatorHandler(filterRolByParamsDto, "params"),
  updateRolById
);

router.post(
  "/",
  checkPermissions("crear_rol"),
  validatorHandler(createRolDto, "body"),
  createRol
);

module.exports = router;
