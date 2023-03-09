const Router = require("express");

const {
  createBranch,
  findBranchById,
  findAllBranches,
  deleteBranchById,
  updateBranchById,
} = require("../controllers/branch.controller");

const {
  createBranchDto,
  filterBranchByParamsDto,
} = require("../dtos/branch.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

// Routes super admin

router.delete(
  "/:id",
  validatorHandler(filterBranchByParamsDto, "params"),
  deleteBranchById
);

router.get("/", findAllBranches);

router.get(
  "/:id",
  validatorHandler(filterBranchByParamsDto, "params"),
  findBranchById
);

router.patch(
  "/:id",
  validatorHandler(filterBranchByParamsDto, "params"),
  updateBranchById
);

router.post(
  "/create_branch",
  validatorHandler(createBranchDto, "body"),
  createBranch
);

module.exports = router;
