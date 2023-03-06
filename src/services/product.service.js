const boom = require("@hapi/boom");

const Product = require("../models/product.model");

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
      attributes: [
        "id",
        "name",
        "part_number",
        "cycle_time",
        "engineering_level",
      ],
      where: filters,
    });

    if (!product) {
      throw boom.badRequest("Product does not exist");
    }

    return product;
  },

  /**
   * Get products
   * @param { Object } filters - filters
   * @returns { Object } Products data
   */

  findProducts: async (filters) => {
    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        "part_number",
        "cycle_time",
        "engineering_level",
      ],
      where: filters,
    });

    return products;
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
