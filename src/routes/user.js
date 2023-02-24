const Router = require("express");

const {
  createUser,
  assignPermissionToUser,
} = require("../controllers/user.controller");

const {
  createUserDto,
  assignPermissionToUserDto,
} = require("../dtos/user.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.post("/create", validatorHandler(createUserDto, "body"), createUser);

router.post(
  "/assign_permission",
  validatorHandler(assignPermissionToUserDto, "body"),
  assignPermissionToUser
);

module.exports = router;
