const Router = require("express");

const {
  createUser,
  assignPermissionToUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  updatePasswordByUser,
  updatePasswordByUserForgot,
  getUserByArea,
} = require("../controllers/user.controller");

const {
  createUserDto,
  assignPermissionToUserDto,
  filterUserByParamsDto,
  updatePasswordDto,
  updatePasswordForgotDto,
} = require("../dtos/user.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_usuarios"), getAllUsers);

router.get(
  "/area/:id",
  checkPermissions("visualizar_usuarios_por_area"),
  getUserByArea
);

router.get(
  "/:id",
  checkPermissions("visualizar_usuario"),
  validatorHandler(filterUserByParamsDto, "params"),
  getUserById
);

router.delete(
  "/:id",
  checkPermissions("eliminar_usuario"),
  validatorHandler(filterUserByParamsDto, "params"),
  deleteUserById
);

router.patch(
  "/password_update",
  validatorHandler(updatePasswordDto, "body"),
  updatePasswordByUser
);

router.patch(
  "/password_update_forgot",
  validatorHandler(updatePasswordForgotDto, "body"),
  updatePasswordByUserForgot
);

router.patch(
  "/:id",
  checkPermissions("actualizar_usuario"),
  validatorHandler(filterUserByParamsDto, "params"),
  updateUserById
);

router.post(
  "/create",
  checkPermissions("crear_usuario"),
  validatorHandler(createUserDto, "body"),
  createUser
);

router.post(
  "/assign_permission",
  checkPermissions("asignar_permiso_a_usuario"),
  validatorHandler(assignPermissionToUserDto, "body"),
  assignPermissionToUser
);

module.exports = router;
