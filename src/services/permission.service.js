const boom = require("@hapi/boom");

const Permission = require("../models/permission.model");
const RolPermission = require("../models/rol-permission.model");

const generateSlug = require("../utils/generate-slug.util");

const permissionService = {
  /**
   * Assign permission to rol or user
   * @param { Object } data - Permission data to sassign
   * @returns { Object } Data created
   */
  assignPermission: async (data) => {
    const permission = await permissionService.findPermissionByRol({
      permission_id: data.permission_id,
      rol_id: data.rol_id,
    });

    if (permission) {
      throw boom.notFound("Permission already has that rol");
    }

    return RolPermission.create(data);
  },

  /**
   * Create an permission
   * @param { Object } data - Permission data
   * @returns { Object } Permission data created
   */

  createPermission: async (data) => {
    const slug = permissionService.generateSlugPermission(data.name);

    const permissionCreate = await Permission.create({ slug, name: data.name });

    if (data.rol_id) {
      await RolPermission.create({
        rol_id: data.rol_id,
        permission_id: permissionCreate.id,
      });
    }

    const permission = await permissionService.permissionValidation({
      id: permissionCreate.id,
    });

    return permission;
  },

  /**
   * Delete an permission
   * @param { Object } filters - filters
   * @returns { Object } Affected rows
   */

  deletePermission: async (filters) => {
    await permissionService.permissionValidation(filters);

    return Permission.destroy({ where: filters });
  },

  /**
   * Generate slug for permission slug.
   * @param { String } slug - String to converter slug
   * @returns { String } Slug
   */

  generateSlugPermission: (slug) => {
    return generateSlug(slug);
  },

  /**
   * Get All Permisions
   * @returns { Array } Permissions
   */

  findPermissions: async (filters = {}) => {
    const permissions = await Permission.findAll({
      attributes: ["id", "name", "slug"],
      where: filters,
    });

    return permissions;
  },

  /**
   * Get permission
   * @param { Object } filters - filters
   * @returns { Object } Permission
   */

  findPermission: async (filters) => {
    const permission = await Permission.findOne({
      attributes: ["id", "name", "slug"],
      where: filters,
    });

    if (!permission) {
      throw boom.badRequest("Permission does not exist");
    }

    return permission;
  },

  /**
   * Get permission by rol
   * @param { Object } filters - filters
   * @returns { Object } Permissions
   */

  findPermissionByRol: async (filters) => {
    const permission = await RolPermission.findOne({
      where: filters,
    });

    return permission;
  },

  /**
   * Get permissions by rol
   * @param { Object } filters - filters
   * @returns { Object } Permissions
   */

  findPermissionsByRol: async (filters) => {
    const permissions = await RolPermission.findAll({
      where: filters,
    });

    return permissions;
  },

  /**
   * Update an permission
   * @param { Object } data - Permission data to update
   * @param { Object } filters - filters
   * @returns { Object } Permission updated
   */

  updatePermission: async (data, filters) => {
    const slug = permissionService.generateSlugPermission(data.name);

    await Permission.update({ slug, ...data }, { where: filters });

    return await permissionService.permissionValidation(filters);
  },
};

module.exports = permissionService;
