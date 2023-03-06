const projectService = require("../services/project.service");

const createProject = async (req, res, next) => {
  try {
    const body = req.body;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const newProject = await projectService.createProject({
      ...body,
      branch_id,
    });

    res.status(201).json({ newProject });
  } catch (error) {
    next(error);
  }
};

const getProjectByid = async (req, res, next) => {
  try {
    const id = req.params;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const project = await projectService.findProject({ ...id, branch_id });

    res.status(200).json({ project });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const projects = await projectService.findProjects({ branch_id });

    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
};

const deleteProjectById = async (req, res, next) => {
  try {
    const id = req.params;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    await projectService.deleteProject({ ...id, branch_id });

    res.status(201).json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};

const updateProjectById = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const project = await projectService.updateProject(body, {
      ...id,
      branch_id,
    });

    res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  deleteProjectById,
  getProjectByid,
  getAllProjects,
  updateProjectById,
};
