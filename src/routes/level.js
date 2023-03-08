const Router = require("express");

const {
  createLevel,
  deleteLevel,
  findAllLevels,
  findLevelById,
  updateLevel,
} = require("../controllers/level.controller");

const { createLevelDto, filterLevelByParamsDto } = require("../dtos/level.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_niveles"), findAllLevels);

router.get(
  "/:id",
  checkPermissions("visualizar_nivel"),
  validatorHandler(filterLevelByParamsDto, "params"),
  findLevelById
);

router.delete(
  "/:id",
  checkPermissions("eliminar_nivel"),
  validatorHandler(filterLevelByParamsDto, "params"),
  deleteLevel
);

router.patch(
  "/:id",
  checkPermissions("actualizar_nivel"),
  validatorHandler(filterLevelByParamsDto, "params"),
  updateLevel
);

router.post(
  "/",
  checkPermissions("crear_nivel"),
  validatorHandler(createLevelDto, "body"),
  createLevel
);

module.exports = router;
