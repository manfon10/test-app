const slugService = require("../services/slug.service");

const createMenuSlug = async (req, res, next) => {
  try {
    const body = req.body;

    const menuSlug = await slugService.createMenuSlug(body);

    res.status(201).json({ menuSlug });
  } catch (error) {
    next(error);
  }
};

const findAllMenuSlugs = async (_, res, next) => {
  try {
    const menuSlugs = await slugService.findMenuSlugs();

    res.status(200).json({ menuSlugs });
  } catch (error) {
    next(error);
  }
};

const assignSlugToRol = async (req, res, next) => {
  try {
    const body = req.body;

    const slug = await slugService.assignMenuSlug(body);

    res.status(201).json({ slug });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMenuSlug, findAllMenuSlugs, assignSlugToRol };
