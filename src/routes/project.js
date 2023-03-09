const Router = require("express");

const {
  getProjectByid,
  getAllProjects,
  deleteProjectById,
  updateProjectById,
  createProject,
} = require("../controllers/project.controller");

const {
  filterProjectByParamsDto,
  createProjectDto,
} = require("../dtos/project.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_proyectos"), getAllProjects);

router.get(
  "/:id",
  checkPermissions("visualizar_proyecto"),
  validatorHandler(filterProjectByParamsDto, "params"),
  getProjectByid
);

router.delete(
  "/:id",
  checkPermissions("eliminar_proyecto"),
  validatorHandler(filterProjectByParamsDto, "params"),
  deleteProjectById
);

router.patch(
  "/:id",
  checkPermissions("actualizar_proyecto"),
  validatorHandler(filterProjectByParamsDto, "params"),
  updateProjectById
);

router.post(
  "/",
  checkPermissions("crear_proyecto"),
  validatorHandler(createProjectDto, "body"),
  createProject
);

module.exports = router;
