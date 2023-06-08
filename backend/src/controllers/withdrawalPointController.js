// withdrawlPointController.js em backend/src/controllers
const withdrawalPointService = require('../services/withdrawalPointService');

const getAllWithdrawalPoints = async (_req, res, _next) => {
  const result = await withdrawalPointService.getAllWithdrawalPoints();

  return res.status(200).json(result);
};

module.exports = { getAllWithdrawalPoints };