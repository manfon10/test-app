const Router = require("express");

const {
  createUser,
  assignPermissionToUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  updatePasswordByUser,
} = require("../controllers/user.controller");

const {
  createUserDto,
  assignPermissionToUserDto,
  filterUserByParamsDto,
  updatePasswordDto,
} = require("../dtos/user.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", getAllUsers);

router.get(
  "/:id",
  validatorHandler(filterUserByParamsDto, "params"),
  getUserById
);

router.delete(
  "/:id",
  validatorHandler(filterUserByParamsDto, "params"),
  deleteUserById
);

router.patch(
  "/password_update",
  validatorHandler(updatePasswordDto, "body"),
  updatePasswordByUser
);

router.patch(
  "/:id",
  validatorHandler(filterUserByParamsDto, "params"),
  updateUserById
);

router.post("/create", validatorHandler(createUserDto, "body"), createUser);

router.post(
  "/assign_permission",
  validatorHandler(assignPermissionToUserDto, "body"),
  assignPermissionToUser
);

module.exports = router;
