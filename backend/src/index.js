/* index.js */
const app = require('./app');
require('dotenv').config();
require('./database/connection');
const insertInitialData = require('./models/initialData');

const PORT = process.env.PORT || 3000;

/* Se quiser utilizar a estrutura de criar uma função para conectar ao banco de dados no arquivo connection.js */
// const connectToDatabase = require('./models/connection');
// connectToDatabase().
//   then(() => {
//     app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
//   })
//   .catch((error) => {
//     console.log('Connection with database generated an error:\r\n');
//     console.error(error);
//     console.log('\r\nServer initialization cancelled');
//     process.exit(0);
//   });

insertInitialData().then(() => {
  app.listen(PORT, "0.0.0.0", () => console.log(`Running server on port: ${PORT}`));
});
