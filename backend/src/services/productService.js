// PrductService.js em backend/src/services
const boom = require('@hapi/boom');
const { Product } = require('../models/models');

// Função que busca todos os produtos no banco de dados
const getAllProducts = async () => {
  const products = await Product.find();
  console.log('products', products);

  if (!products) throw boom.notFound('Products not found');

  const productsWithImageUrl = products.map((product) => {
    const { url_image, ...rest } = product._doc;
    return { imageUrl: url_image, ...rest };
  });

  return productsWithImageUrl;
};

module.exports = { getAllProducts };