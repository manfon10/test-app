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

module.exports = { createUser };
