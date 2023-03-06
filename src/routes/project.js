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

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", getAllProjects);

router.get(
  "/:id",
  validatorHandler(filterProjectByParamsDto, "params"),
  getProjectByid
);

router.delete(
  "/:id",
  validatorHandler(filterProjectByParamsDto, "params"),
  deleteProjectById
);

router.patch(
  "/:id",
  validatorHandler(filterProjectByParamsDto, "params"),
  updateProjectById
);

router.post("/", validatorHandler(createProjectDto, "body"), createProject);

module.exports = router;
