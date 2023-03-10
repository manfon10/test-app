require("dotenv").config();

const boom = require("@hapi/boom");

const authService = require("../services/auth.service");
const permissionService = require("../services/permission.service");
const userService = require("../services/user.service");

const checkApiKey = (req, _, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey === process.env.APP_API_KEY) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

const checkToken = async (req, _, next) => {
  try {
    let token;

    if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw boom.unauthorized("Token is required");
    }

    const decodedToken = authService.decodedToken(token);

    const user = await userService.findUser({ id: decodedToken.id });

    if (!user) {
      throw boom.forbidden("Invalid Session");
    }

    req.sessionUser = user;

    next();
  } catch (error) {
    next(boom.badRequest(error));
  }
};

const checkPermissions = (slug) => async (req, _, next) => {
  try {
    const permission = await permissionService.findPermission({
      slug,
    });

    const permissionByRol = await permissionService.findPermissionsByRol({
      permission_id: permission.id,
      rol_id: req.sessionUser.rol.id,
    });

    const permissionByUser = await userService.filterPermissionByUser({
      permission_id: permission.id,
      user_id: req.sessionUser.id,
    });

    if (
      permissionByRol.length >= 1 ||
      permissionByUser ||
      req.sessionUser.rol.id === 1
    ) {
      return next();
    }

    return next(boom.forbidden("Permission denied"));
  } catch (error) {
    next(boom.notFound(error));
  }
};

module.exports = { checkApiKey, checkToken, checkPermissions };
