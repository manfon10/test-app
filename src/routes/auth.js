const Router = require("express");

const {
  loginUser,
  logoutUser,
  forgotPassworByUser,
} = require("../controllers/auth.controller");

const { loginUserDto, forgotPasswordDto } = require("../dtos/auth.dto");

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.post(
  "/forgot_password",
  validatorHandler(forgotPasswordDto, "body"),
  forgotPassworByUser
);

router.post("/login", validatorHandler(loginUserDto, "body"), loginUser);

router.post("/logout", logoutUser);

module.exports = router;
