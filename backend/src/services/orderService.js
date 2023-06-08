// saleService.js em backend/src/services
const boom = require('@hapi/boom');
const { Sale, User, WithdrawalPoint, Product, ProductSale } = require('../models/models');

const checkIfUserExists = async (userId) => {
  const userExists = await User.findOne({ _id: userId });
  if (!userExists) throw boom.notFound('User not found');
};

const checkIfWithdrawalPointExists = async (withdrawalPointId) => {
  const withdrawalPointExists = await WithdrawalPoint.findOne({ _id: withdrawalPointId });
  if (!withdrawalPointExists) throw boom.notFound('Withdrawal Point not found');
};

const checkIfProductExists = async (products) => {
  for (const { productId } of products) {
    const productExists = await Product.findOne({ _id: productId });
    if (!productExists) throw boom.notFound('Product not found');
  }
};

const checkForDuplicateProducts = (products) => {
  const productIds = products.map((product) => product.productId);
  const uniqueProductIds = new Set(productIds);
  if (productIds.length !== uniqueProductIds.size) {
    throw boom.badData('Produtos duplicados não são permitidos');
  }
};

const checkSaleDate = (saleDate) => {
  const now = new Date();
  const nowDateOnlyString = now.toISOString().split('T')[0];

  const saleDateObject = new Date(saleDate);
  const saleDateOnlyString = saleDateObject.toISOString().split('T')[0];

  if (saleDateOnlyString < nowDateOnlyString) {
    throw boom.badData('Data de venda não pode ser no passado');
  }
};

const validateInput = async ({ userId, withdrawalPointId, saleDate, products }) => {
  await checkIfUserExists(userId);
  await checkIfWithdrawalPointExists(withdrawalPointId);
  await checkIfProductExists(products);
  checkForDuplicateProducts(products);
  checkSaleDate(saleDate);
};

const createNewSale = async ({ userId, totalPrice, withdrawalPointId }) => {
  const newOrder = await Sale.create({
    user_id: userId,
    total_price: totalPrice,
    pick_up_place_id: withdrawalPointId,
    sale_date: new Date(),
  });
  console.log('newOrder', newOrder);

  if (!newOrder) throw boom.notFound('Failed to create new order');
  
  return newOrder;
};

const createProductSales = async (products, saleId) => {
  for (const product of products) {
    const newProductSale = await ProductSale.create({
      sale_id: saleId,
      product_id: product.productId,
      quantity: product.quantity,
    });
    console.log('newProductSale', newProductSale);

    if (!newProductSale) throw boom.notFound('Failed to create new product sale');
  }
};

const updateUser = async (userId, cashbackValue) => {
  const result = await User.updateOne({
    _id: userId,
  }, {
    $set: { cashback_value: cashbackValue },
  });
  console.log('result', result);
  
  if (result.modifiedCount === 0) throw boom.notFound('Failed to update user cashback');
};

// Função responsável por gravar uma nova ordem de compra no banco de dados
const createNewOrder = async (saleData) => {
  console.log('saleData', saleData);
  const { userId, cashbackValue, products } = saleData;

  await validateInput(saleData);

  const newOrder = await createNewSale(saleData);
  console.log('newOrder', newOrder);

  await createProductSales(products, newOrder._id);

  await updateUser(userId, cashbackValue);

  return { message: 'Order created successfully' };
};

/* // Função responsável por gravar uma nova ordem de compra no banco de dados
const createNewOrder = async (saleData) => {
  const { userId, totalPrice, withdrawalPointId, saleDate, products, cashbackValue } = saleData;
  // console.log('saleData', saleData);

  // Check if the user exists
  await checkIfUserExists(userId);

  // Check if the withdrawal point exists
  await checkIfWithdrawalPointExists(withdrawalPointId);

  // Check if products in array exist usando for in
  await checkIfProductExists(products);

  // Check for duplicate products
  checkForDuplicateProducts(products);

  // Check if the sale date is not in the past
  const now = new Date();
  const nowDateOnlyString = now.toISOString().split('T')[0];

  const saleDateObject = new Date(saleDate);
  const saleDateOnlyString = saleDateObject.toISOString().split('T')[0];

  if (saleDateOnlyString < nowDateOnlyString) {
    throw boom.badData('Sale Date cannot be in the past');
  }

  const newOrder = await Sale.create({
    user_id: userId,
    total_price: totalPrice,
    pick_up_place_id: withdrawalPointId,
    sale_date: new Date(),
  });
  console.log('newSale', newOrder);

  if (!newOrder) throw boom.notFound('Failed to create new order');

  // insere os produtos da ordem de compra no banco de dados utilizando o id da newOrder
  for (const product of products) {
    const newProductSale = await ProductSale.create({
      sale_id: newOrder._id,
      product_id: product.productId,
      quantity: product.quantity,
    });
    console.log('newProductSale', newProductSale);

    if (!newProductSale) throw boom.notFound('Failed to create new product sale');
  }

  // insere o novo valor de cashback no banco de dados
  const result = await User.updateOne({
    _id: userId,
  }, {
    $set: { cashback_value: cashbackValue },
  });
  
  console.log('update result', result);
  
  if (result.modifiedCount === 0) throw boom.notFound('Failed to update user cashback');

  return { message: 'Order created successfully' };
}; */

// Função responsável por buscar todas as ordens de compra relacionadas a um usuário no banco de dados
const getUserOrders = async (userId) => {
  console.log('userId', userId);
  // busca todas as ordens de compra que estão armazenadas no banco de dados
  const allOrders = await Sale.find();
  console.log('allOrders', allOrders);
  const allUserOrders = await Sale.find({ user_id: userId });
  console.log('allUserOrders', allUserOrders);

  if (!allUserOrders) throw boom.notFound('Orders not found');

  const ordersWithCamelCase = allUserOrders.map((order) => {
    const { total_price, pick_up_place_id, sale_date, ...rest } = order._doc;
    return {
      totalPrice: total_price,
      pickUpPlaceId: pick_up_place_id,
      saleDate: sale_date,
      ...rest
    };
  });

  return ordersWithCamelCase;
};


module.exports = { createNewOrder, getUserOrders };