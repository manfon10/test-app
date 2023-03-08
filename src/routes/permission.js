const Router = require("express");

const {
  createPermission,
  findPermissionById,
  deletePermissionByid,
  findAllPermissions,
  updatePermissionById,
} = require("../controllers/permission.controller");

const {
  createPermissionDto,
  filterPermissionByParamsDto,
} = require("../dtos/permission.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_permisos"), findAllPermissions);

router.get(
  "/:id",
  checkPermissions("visualizar_permiso"),
  validatorHandler(filterPermissionByParamsDto, "params"),
  findPermissionById
);

router.delete(
  "/:id",
  checkPermissions("eliminar_permiso"),
  validatorHandler(filterPermissionByParamsDto, "params"),
  deletePermissionByid
);

router.patch(
  "/:id",
  checkPermissions("actualizar_permiso"),
  validatorHandler(filterPermissionByParamsDto, "params"),
  updatePermissionById
);

router.post(
  "/",
  checkPermissions("crear_permiso"),
  validatorHandler(createPermissionDto, "body"),
  createPermission
);

module.exports = router;
