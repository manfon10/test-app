const Router = require("express");

const {
  createMenuSlug,
  findAllMenuSlugs,
  assignSlugToRol,
} = require("../controllers/slug.controller");

const { createSlugMenuDto, assignSlugDto } = require("../dtos/slug.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_enlaces"), findAllMenuSlugs);

router.post(
  "/",
  checkPermissions("crear_enlace"),
  validatorHandler(createSlugMenuDto, "body"),
  createMenuSlug
);

router.post(
  "/assign_slug",
  checkPermissions("asignar_slug"),
  validatorHandler(assignSlugDto, "body"),
  assignSlugToRol
);

module.exports = router;
