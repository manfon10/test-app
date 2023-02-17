const branchService = require("../services/branch.service");

const createBranch = async (req, res, next) => {
  try {
    const body = req.body;

    const newBranch = await branchService.createBranch(body);

    res.status(201).json({ newBranch });
  } catch (error) {
    next(error);
  }
};

const deleteBranchById = async (req, res, next) => {
  try {
    const id = req.params;

    await branchService.deleteBranch(id);

    res.status(201).json({ message: "Branch deleted!" });
  } catch (error) {
    next(error);
  }
};

const findAllBranches = async (_, res, next) => {
  try {
    const branches = await branchService.findBranches();

    res.status(200).json({ branches });
  } catch (error) {
    next(error);
  }
};

const findBranchById = async (req, res, next) => {
  try {
    const id = req.params;

    const branch = await branchService.findBranch(id);

    res.status(200).json({ branch });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBranch,
  deleteBranchById,
  findAllBranches,
  findBranchById,
};
