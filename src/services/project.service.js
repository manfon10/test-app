const boom = require("@hapi/boom");

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
    await projectService.findClient(filters);

    return await Project.destroy({ where: filters });
  },

  /**
   * Get project
   * @param { Object } filters - filters
   * @returns { Object } Project data
   */

  findProject: async (filters) => {
    const project = await Project.findOne({
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
   * @param { Object } filters - filters
   * @returns { Object } Projects data
   */

  findProjects: async () => {
    const projects = await Project.findAll({
      attributes: ["id", "name"],
    });

    return projects;
  },

  /**
   * Update project
   * @param { Object } data - Data client to update
   * @param { Object } filters - filters
   * @returns { Object } Project data update
   */

  updateProject: async (data, filters) => {
    await Project.update(data, { where: filters });

    return await projectService.findProject(filters);
  },
};

module.exports = projectService;
