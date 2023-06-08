/* dbReset.js em backend/src/database, que será utilizado para resetar o banco de dados: */
const mongoose = require('mongoose');
const CustomError = require('../errors/CustomError');
require('./connection');

async function resetDb() {
  // Aguarda a conexão estar pronta
  mongoose.connection.once('open', async () => {
    // Tenta remover o banco de dados inteiro
    try {
      await mongoose.connection.db.dropDatabase();
      console.log('Database resetado com sucesso!');
      process.exit(0);
    } catch (error) {
      throw new CustomError(500, `Erro ao resetar o banco de dados: ${error.message}`);
    }
  });
}

resetDb();