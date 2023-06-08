// saleController.js em backend/src/controllers
const saleService = require('../services/orderService');

const createNewOrder = async (req, res, _next) => {
  // console.log('createNewOrder', req.body);
  const result = await saleService.createNewOrder(req.body);

  return res.status(201).json(result);
};

const getUserOrders = async (req, res, _next) => {
  console.log('getUserOrders', req.user);
  const { id: userId } = req.user;
  const result = await saleService.getUserOrders(userId);

  return res.status(200).json(result);
};

module.exports = {
  createNewOrder,
  getUserOrders,
};