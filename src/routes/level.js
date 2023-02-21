const Router = require("express");

const {
  createLevel,
  deleteLevel,
  findAllLevels,
  findLevelById,
  updateLevel,
} = require("../controllers/level.controller");

const { createLevelDto, filterLevelByParamsDto } = require("../dtos/level.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkToken);
router.use(checkCookie);

// Routes super admin

router.get("/", findAllLevels);

router.get(
  "/:id",
  validatorHandler(filterLevelByParamsDto, "params"),
  findLevelById
);

router.delete(
  "/:id",
  validatorHandler(filterLevelByParamsDto, "params"),
  deleteLevel
);

router.patch(
  "/:id",
  validatorHandler(filterLevelByParamsDto, "params"),
  updateLevel
);

router.post("/", validatorHandler(createLevelDto, "body"), createLevel);

module.exports = router;
