const Router = require("express");

const { createUser } = require("../controllers/user.controller");

const { createUserDto } = require("../dtos/user.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkToken);
router.use(checkCookie);

// Routes super admin

router.post("/create", validatorHandler(createUserDto, "body"), createUser);

module.exports = router;
