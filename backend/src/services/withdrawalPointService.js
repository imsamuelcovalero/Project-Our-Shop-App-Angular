// withdrawalPointService.js em backend/src/services
const boom = require('@hapi/boom');
const { WithdrawalPoint } = require('../models/models');

//Função responsável por buscar todos os pontos de retirada no banco de dados
const getAllWithdrawalPoints = async () => {
  const withdrawalPoints = await WithdrawalPoint.find();
  console.log('withdrawalPoints', withdrawalPoints);

  if (!withdrawalPoints) throw boom.notFound('Withdrawal points not found');

  return withdrawalPoints;
};

module.exports = { getAllWithdrawalPoints };