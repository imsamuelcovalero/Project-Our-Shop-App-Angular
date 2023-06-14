/* app.js */
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');
const errorMiddleware = require('./middlewares/error.middleware');

// const swagger = require('swagger-ui-express');
// const swaggerFile = require('./doc/swagger.json');

const uploadPath = path.resolve('uploads');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(uploadPath));

// app.use('/docs', swagger.serve, swagger.setup(swaggerFile));

// servindo arquivos estáticos da pasta dist
const angularAppPath = path.resolve('../frontend/dist/frontend');
app.use(express.static(angularAppPath));

app.use(routes);

// adicionar uma rota catchall para servir o index.html do Angular para todas as outras rotas
app.get('*', (req, res) => res.sendFile(path.resolve(angularAppPath, 'index.html')));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;

