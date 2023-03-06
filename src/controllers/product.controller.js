const productService = require("../services/product.service");

const createProduct = async (req, res, next) => {
  try {
    const body = req.body;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const newProduct = await productService.createProduct({
      ...body,
      branch_id,
    });

    res.status(201).json({ newProduct });
  } catch (error) {
    next(error);
  }
};

const getProductByid = async (req, res, next) => {
  try {
    const id = req.params;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const product = await productService.findProduct({ ...id, branch_id });

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const products = await productService.findProducts({ branch_id });

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const id = req.params;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    await productService.deleteProduct({ ...id, branch_id });

    res.status(201).json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;
    const branch_id = req.sessionUser.branch && req.sessionUser.branch.id;

    const product = await productService.updateProduct(body, {
      ...id,
      branch_id,
    });

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductByid,
  updateProductById,
};
