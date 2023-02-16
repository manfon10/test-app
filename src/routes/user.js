const Router = require("express");

const { createUser } = require("../controllers/user.controller");

const { createUserDto } = require("../dtos/user.dto");

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

// Routes super admin

router.post("/create", validatorHandler(createUserDto, "body"), createUser);

module.exports = router;
