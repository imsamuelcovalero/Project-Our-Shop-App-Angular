// userService.js em backend/src/services
const bcrypt = require('bcrypt');
const { User } = require('../models/models')
const tokenValidator = require('../middlewares/tokenFunctions');
const boom = require('@hapi/boom');

const checkUserExistsBy = async (usernameOrEmail) => {
  // console.log('checkUserExistsBy', usernameOrEmail);
  const result = await User.findOne({ 
    $or: [ { username: usernameOrEmail }, { email: usernameOrEmail } ] 
  });

  return result;
};

const login = async (userData) => {
  const { identifier, password } = userData;

  const user = await checkUserExistsBy(identifier);
  console.log('user', user);

  if (!user) throw boom.notFound('User not found');
  // if (!user) throw new CustomError(404, 'User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw boom.unauthorized('Incorrect password');
  // if (!isPasswordValid) throw new CustomError(401, 'Incorrect password');

  const token = tokenValidator.generateToken(user);

  const result = { token, id: user.id, email: user.email, username: user.username, role: user.role };
  return result;
};

const checkUserExists = async (userData) => {
  const { identifier } = userData;
  console.log('checkUserExists', userData);
  console.log('identifier', identifier);
  
  const user = await checkUserExistsBy(identifier);
  
  console.log('user', user);

  if (user) throw new boom.conflict('User already exists');

  return { message: 'User does not exist' };
};

// cria uma função auxiliar para criar um novo usuário no banco de dados
const createNewUser = async (userData) => {
  // primeiro verifica se o usuário já existe no banco de dados
  const { name, username, email, password } = userData;
  const user = await checkUserExistsBy(email);
  console.log('user', user);

  if (user) throw boom.conflict('User already exists');
  // if (user) throw new CustomError(409, 'User already exists'); 

  // segundo encripta a senha com o bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    role: 'customer',
    cashback_value: 0
  });
  console.log('newUser', newUser);

  // caso ocorra algum problema e o usuário não seja criado,
  // retorna um erro personalizado.
  if (!newUser) throw new boom(500, 'Failed to create user');
  // if (!newUser) throw new CustomError(500, 'Failed to create user');

  return { message: 'User created successfully' };
};

const verifyUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw boom.notFound('User not found');

  // const cashbackValue = User.findOne({ _id: userId }, { cashback_value: 1 });

  const userResponse = {
    // id: user._id,
    // username: user.username,
    // email: user.email,
    // role: user.role,
    cashbackValue: user.cashback_value
  };

  return userResponse;
};

module.exports = {
  login,
  checkUserExists,
  createNewUser,
  verifyUser,
};
