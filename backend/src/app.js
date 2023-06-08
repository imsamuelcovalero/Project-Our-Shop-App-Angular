/* app.js */
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const path = require('path');
const errorMiddleware = require('./middlewares/error.middleware');

const uploadPath = path.resolve('uploads');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(uploadPath));

// servindo arquivos estáticos da pasta dist
const vueAppPath = path.resolve('../frontend/dist');
app.use(express.static(vueAppPath));

app.use(routes);

// adicionar uma rota catchall para servir o index.html do Vue para todas as outras rotas
app.get('*', (req, res) => res.sendFile(path.resolve(vueAppPath, 'index.html')));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;

