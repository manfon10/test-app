const boom = require("@hapi/boom");

const Product = require("../models/product.model");
const Project = require("../models/project.model");
const Client = require("../models/client.model");

const userService = require("./user.service");

const productService = {
  /**
   * Create product
   * @param { Object } data - Data Product
   * @returns { Object } Product data
   */

  createProduct: async (data) => {
    const project = await Product.create(data);

    return await productService.findProduct({ id: project.id });
  },

  /**
   * Delete product
   * @param { Object } filters - filters
   * @returns { Array } Rows afected
   */

  deleteProduct: async (filters) => {
    await productService.findProduct(filters);

    return await Product.destroy({ where: filters });
  },

  /**
   * Get product
   * @param { Object } filters - filters
   * @returns { Object } Product data
   */

  findProduct: async (filters) => {
    const product = await Product.findOne({
      include: {
        model: Project,
        as: "project",
        attributes: ["id", "name"],
        include: {
          model: Client,
          as: "client",
          attributes: ["id", "name"],
        },
      },
      attributes: [
        "id",
        "name",
        "part_number",
        "cycle_time",
        "engineering_level",
        "auditor_id",
      ],
      where: filters,
    });

    if (!product) {
      throw boom.badRequest("Product does not exist");
    }

    const auditor = await userService.findUser({ id: product.auditor_id });

    delete product.dataValues.auditor_id;

    return { ...product.dataValues, auditor };
  },

  /**
   * Get products
   * @param { Object } filters - filters
   * @returns { Object } Products data
   */

  findProducts: async (filters) => {
    let productsResult = [];

    const products = await Product.findAll({
      include: {
        model: Project,
        as: "project",
        attributes: ["id", "name"],
        include: {
          model: Client,
          as: "client",
          attributes: ["id", "name"],
        },
      },
      attributes: [
        "id",
        "name",
        "part_number",
        "cycle_time",
        "engineering_level",
        "auditor_id",
      ],
      where: filters,
    });

    const productsPromise = products.map(async (product) => {
      const auditor = await userService.findUser({ id: product.auditor_id });

      delete auditor.dataValues.password;
      delete product.dataValues.auditor_id;

      productsResult.push({
        ...product.dataValues,
        auditor,
      });
    });

    await Promise.all(productsPromise);

    return productsResult;
  },

  /**
   * Update product
   * @param { Object } data - Data product to update
   * @param { Object } filters - filters
   * @returns { Object } Product data update
   */

  updateProduct: async (data, filters) => {
    await Product.update(data, { where: filters });

    return await productService.findProduct(filters);
  },
};

module.exports = productService;
