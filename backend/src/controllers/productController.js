// productController.js em backend/src/controllers
const productService = require('../services/productService');

const getAllProducts = async (_req, res, next) => {
  const result = await productService.getAllProducts();

  return res.status(200).json(result);
};

module.exports = { getAllProducts };