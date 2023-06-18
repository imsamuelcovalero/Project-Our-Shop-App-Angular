const fs = require('fs');
const path = require('path');

const routesPath = path.resolve(__dirname, './routes');

// Leitura dos arquivos na pasta 'routes'
const files = fs.readdirSync(routesPath);

// Inicialização do objeto swagger
let swaggerObject = {
  openapi: "3.0.0",
  info: {
    title: "API",
    description: "API",
    version: "1.0.0"
  },
  paths: {},
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT used for authorization. Generated using HS256 algorithm and expires in 24 hours."
      }
    },
    schemas: {
      "Error": {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer",
            "description": "Status code."
          },
          "message": {
            "type": "string",
            "description": "Error message."
          }
        }
      }
    }
  }
};

// Importando cada arquivo JSON das rotas e inserindo no objeto Swagger
files.forEach(file => {
  const route = require(`./routes/${file}`);
  swaggerObject.paths = { ...swaggerObject.paths, ...route.paths };
  if (route.components && route.components.schemas) {
    swaggerObject.components.schemas = { ...swaggerObject.components.schemas, ...route.components.schemas };
  }
});

module.exports = swaggerObject;