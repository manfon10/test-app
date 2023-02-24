const userService = require("../services/user.service");

const createUser = async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await userService.create(body);

    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
};

const assignPermissionToUser = async (req, res, next) => {
  try {
    const body = req.body;

    const permission = await userService.assignPermission(body);

    res.status(201).json({ permission });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, assignPermissionToUser };
