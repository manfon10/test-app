const boom = require("@hapi/boom");

const Product = require("../models/product.model");
const Project = require("../models/project.model");
const Client = require("../models/client.model");
const ProductManager = require("../models/product-manager.model");

const userService = require("./user.service");

const productService = {
  /**
   * Create product
   * @param { Object } data - Data Product
   * @returns { Object } Product data
   */

  createProduct: async (data) => {
    const product = await Product.create(data);

    const productsManagerPromise = data.core_team.map(async (dataCoreTeam) => {
      await ProductManager.create({
        user_id: dataCoreTeam.user_id,
        product_id: product.id,
      });
    });

    await Promise.all(productsManagerPromise);

    return await productService.findProduct({ id: product.id });
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
      include: [
        {
          model: Project,
          as: "project",
          attributes: ["id", "name"],
          include: {
            model: Client,
            as: "client",
            attributes: ["id", "name"],
          },
        },
        {
          model: ProductManager,
          as: "product_manager",
          attributes: ["user_id"],
        },
      ],
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

    delete auditor.password;
    delete product.dataValues.auditor_id;

    product.dataValues.auditor = auditor;

    let managers = [];

    const productManagersPromise = product.product_manager.map(
      async (productManager) => {
        const user = await userService.findUser({
          id: productManager.user_id,
        });

        delete user.password;

        managers.push(user);
      }
    );

    await Promise.all(productManagersPromise);

    product.dataValues.core_team = managers;

    delete product.dataValues.product_manager;

    return product;
  },

  /**
   * Get products
   * @param { Object } filters - filters
   * @returns { Object } Products data
   */

  findProducts: async (filters) => {
    const products = await Product.findAll({
      include: [
        {
          model: Project,
          as: "project",
          attributes: ["id", "name"],
          include: {
            model: Client,
            as: "client",
            attributes: ["id", "name"],
          },
        },
        {
          model: ProductManager,
          as: "product_manager",
          attributes: ["user_id"],
        },
      ],
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

      delete auditor.password;
      delete product.dataValues.auditor_id;

      product.dataValues.auditor = auditor;

      if (product.product_manager.length >= 1) {
        const managersPromise = product.product_manager.map(
          async (productManager) => {
            const user = await userService.findUser({
              id: productManager.user_id,
            });

            delete user.password;

            return user;
          }
        );

        delete product.dataValues.product_manager;

        const managers = await Promise.all(managersPromise);

        product.dataValues.core_team = managers;
      }

      delete product.dataValues.product_manager;
    });

    await Promise.all(productsPromise);

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
