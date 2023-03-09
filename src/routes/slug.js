const Router = require("express");

const {
  createMenuSlug,
  findAllMenuSlugs,
} = require("../controllers/slug.controller");

const { createSlugMenuDto } = require("../dtos/slug.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", findAllMenuSlugs);

router.post("/", validatorHandler(createSlugMenuDto, "body"), createMenuSlug);

module.exports = router;
