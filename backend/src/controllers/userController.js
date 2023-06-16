// userController.js em backend/src/controllers
const boom = require('@hapi/boom');
const userService = require('../services/userService');

const login = async (req, res, _next) => {
  console.log('login', req.body);
  const result = await userService.login(req.body);

  return res.status(200).json(result);
};

const register = async (req, res, _next) => {
  console.log('registerController', req.body);
  // const { name, username, email } = req.body;
  const result = await userService.createNewUser(req.body);

  return res.status(201).json(result);
};

/* Função que a ser utilizada durante inserção do username e email no formulário de cadastro */
const checkUserExists = async (req, res, _next) => {
  // console.log('checkUserExists', req.body);
  const result = await userService.checkUserExists(req.body);
  
  return res.status(200).json(result);
};

const verifyUser = async (req, res, _next) => {
  if (!req.user) throw boom.unauthorized('User is not authenticated');
  const { id } = req.user;
  const result = await userService.verifyUser(id);

  return res.status(200).json(result);
};

module.exports = {
  login,
  register,
  checkUserExists,
  verifyUser,
};
