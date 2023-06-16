/* tokenFunctions.js  em backend/src/middlewares */
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';

const tokenFunctions = {
  generateToken: (user) => {
    const signOptions = {
      expiresIn: '24h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ id: user.id, email: user.email, username: user.username, role: user.role }, secret, signOptions);
    console.log('token', token);
    return token;
  },

  decode: (req, _res, next) => {
    let token = req.headers.authorization;
    // console.log('tokenDecode', token);

    if (!token) throw new boom.badRequest('Token must be a valid token');
    // if (!token) throw new CustomError(401, 'Token must be a valid token');

    // Se o token começa com 'Bearer ', remove 'Bearer '
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    try {
      const decoded = jwt.verify(token, secret);
      console.log('decoded', decoded);

      req.user = decoded;

      next();
    } catch (err) {
      throw new boom.badRequest('Token is malformed');
      // throw new CustomError(401, 'Token must be a valid token');
    }
  },

  // Função que verifica se o usuário está autenticado e se possui o papel (role) necessário para acessar a rota
  authorize: (roles) => (req, _res, next) => {
    if (!req.user) throw boom.unauthorized('User is not authenticated');
    
    const { role } = req.user;

    if (!roles.includes(role)) throw boom.forbidden('User is not authorized');

    next();
  }
};

module.exports = tokenFunctions;
