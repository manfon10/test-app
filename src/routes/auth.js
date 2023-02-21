const Router = require("express");

const { loginUser, logoutUser } = require("../controllers/auth.controller");

const { loginUserDto } = require("../dtos/auth.dto");

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.post("/login", validatorHandler(loginUserDto, "body"), loginUser);

router.post("/logout", logoutUser);

module.exports = router;
