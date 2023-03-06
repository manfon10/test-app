const boom = require("@hapi/boom");
const Client = require("../models/client.model");

const Project = require("../models/project.model");

const projectService = {
  /**
   * Create project
   * @param { Object } data - Data Project
   * @returns { Object } Project data
   */

  createProject: async (data) => {
    const project = await Project.create(data);

    return await projectService.findProject({ id: project.id });
  },

  /**
   * Delete project
   * @param { Object } filters - filters
   * @returns { Array } Rows afected
   */

  deleteProject: async (filters) => {
    await projectService.findProject(filters);

    return await Project.destroy({ where: filters });
  },

  /**
   * Get project
   * @param { Object } filters - filters
   * @returns { Object } Project data
   */

  findProject: async (filters) => {
    const project = await Project.findOne({
      include: {
        model: Client,
        as: "client",
        attributes: ["id", "name"],
      },
      attributes: ["id", "name"],
      where: filters,
    });

    if (!project) {
      throw boom.badRequest("Project does not exist");
    }

    return project;
  },

  /**
   * Get projects
   * @returns { Object } Projects data
   */

  findProjects: async (filters) => {
    const projects = await Project.findAll({
      include: {
        model: Client,
        as: "client",
        attributes: ["id", "name"],
      },
      attributes: ["id", "name"],
      where: filters,
    });

    if (!projects.length >= 1) {
      throw boom.badRequest("Project does not exist");
    }

    return projects;
  },

  /**
   * Update project
   * @param { Object } data - Data project to update
   * @param { Object } filters - filters
   * @returns { Object } Project data update
   */

  updateProject: async (data, filters) => {
    await Project.update(data, { where: filters });

    return await projectService.findProject(filters);
  },
};

module.exports = projectService;
