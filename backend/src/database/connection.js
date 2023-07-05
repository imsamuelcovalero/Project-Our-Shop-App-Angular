/* arquivo de conexão com o mongoose connection.js em backend/src/models */
const mongoose = require('mongoose');
const CustomError = require('../errors/CustomError');
require('dotenv').config();

console.log('log de teste', process.env.MONGODB_URI);

const MONGO_DB_URL = 'mongodb://localhost:27017/mongodb';

mongoose
  .connect(process.env.MONGODB_URI || MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => {
    throw new CustomError(500, `Erro na conexão ao MongoDB: ${err.message}`);
  });

mongoose.connection.on('error', (err) => {
  throw new CustomError(500, `Erro de conexão: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado do MongoDB');
});

/* se quiser utilizar a estrutura de criar uma função para conectar ao banco de dados no arquivo connection.js */
// const connectToDatabase = (
//   mongoDatabaseURI = process.env.MONGO_URI
//     || MONGO_DB_URL,
// ) => mongoose.connect(mongoDatabaseURI);

// export default connectToDatabase;
