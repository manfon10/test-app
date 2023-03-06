const projectService = require("../services/project.service");

const createProject = async (req, res, next) => {
  try {
    const body = req.body;

    const newProject = await projectService.createProject(body);

    res.status(201).json({ newProject });
  } catch (error) {
    next(error);
  }
};

const getProjectByid = async (req, res, next) => {
  try {
    const id = req.params;

    const project = await projectService.findProject(id);

    res.status(200).json({ project });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (_, res, next) => {
  try {
    const projects = await projectService.findProjects();

    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
};

const deleteProjectById = async (req, res, next) => {
  try {
    const id = req.params;

    await projectService.deleteProject(id);

    res.status(201).json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};

const updateProjectById = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;

    const project = await projectService.updateProject(body, id);

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
