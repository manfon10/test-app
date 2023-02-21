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

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

// Routes super admin

// Create branch

router.post(
  "/create_branch",
  validatorHandler(createBranchDto, "body"),
  createBranch
);

// Find branch by id

router.get(
  "/:id",
  validatorHandler(filterBranchByParamsDto, "params"),
  findBranchById
);

// Find all branches

router.get("/", findAllBranches);

// Delete branch by id

router.delete(
  "/:id",
  validatorHandler(filterBranchByParamsDto, "params"),
  deleteBranchById
);

router.patch(
  "/:id",
  validatorHandler(filterBranchByParamsDto, "params"),
  updateBranchById
);

module.exports = router;
