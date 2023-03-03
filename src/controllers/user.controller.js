const userService = require("../services/user.service");

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const newUser = await userService.createUser({
      ...data,
      branch_id,
    });

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

const getAllUsers = async (req, res, next) => {
  try {
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const users = await userService.findUsers({ branch_id });

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    await userService.deleteUser({ ...id, branch_id });

    res.status(201).json({ message: "User deleted!" });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params;

    const user = await userService.findUser(id);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;

    const user = await userService.updateUser(body, id);

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

const updatePasswordByUser = async (req, res, next) => {
  try {
    const user_id = req.sessionUser.id;
    const body = req.body;

    await userService.updatePassword(body, { id: parseInt(user_id) });

    res.status(201).json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
};

const updatePasswordByUserForgot = async (req, res, next) => {
  try {
    const user_id = req.sessionUser.id;
    const body = req.body;

    await userService.updatePassword(body, { id: parseInt(user_id) }, true);

    res.status(201).json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  assignPermissionToUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  updatePasswordByUser,
  updatePasswordByUserForgot,
};
