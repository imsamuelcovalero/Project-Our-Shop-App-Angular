/* joySchemas.js */
const joi = require('joi');

const ALL_FIELDS_MUST_BE_FILLED = '400|Todos os campos devem ser preenchidos';
const INVALID_FIELDS = '422|Campos inválidos';
const INCORRECT_PASSWORD = '400|Senha em formato inválido';
const USERNAME_MUST_HAVE_AT_LEAST_3_CHARACTERS = '400|Nome de usuário deve ter pelo menos 3 caracteres';
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

// esquema para login
const loginSchema = joi.object({
  identifier: joi.alternatives().try(
    joi.string().email().required(),
    joi.string().min(3).required()
  ).required().error(errors => {
    errors.forEach(err => {
      switch (err.code) {
        case 'string.empty':
          err.message = ALL_FIELDS_MUST_BE_FILLED;
          break;
        case 'string.email':
          err.message = '400|Identifier deve ser um e-mail válido';
          break;
        case 'string.min':
          err.message = USERNAME_MUST_HAVE_AT_LEAST_3_CHARACTERS;
          break;
        case 'any.required':
          err.message = '400|Identifier deve existir';
          break;
        case 'alternatives.match':
          err.message = '400|Identifier deve ser um e-mail válido ou ter pelo menos 3 caracteres';
          break;
        default:
          err.message = '400|Identifier deve existir';
          break;
      }
    });
    return errors;
  }),
  password: joi.string().required().min(8).pattern(new RegExp(passwordRegex)).messages({
    'string.min': '400|Senha deve ter pelo menos 8 caracteres',
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'string.pattern.base': INCORRECT_PASSWORD,
    'any.required': '400|Password deve existir',
  }),
});

// esquema para registro
const registerSchema = joi.object({
  name: joi.string().required().min(5).messages({
    'string.min': '400|Nome deve ter pelo menos 5 caracteres',
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'any.required': '400|Nome deve existir',
  }),
  username: joi.string().min(3).required().pattern(new RegExp(usernameRegex)).messages({
    'string.min': USERNAME_MUST_HAVE_AT_LEAST_3_CHARACTERS,
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'any.required': '400|Username deve existir',
    'string.pattern.base': '400|Username deve conter apenas letras e números',
  }),
  email: joi.string().required().email().invalid(joi.ref('username')).messages({
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'string.email': INVALID_FIELDS,
    'any.required': '400|Email deve existir',
    'any.invalid': '400|Email e username não podem ser iguais',
  }),
  password: joi.string().required().min(8).pattern(new RegExp(passwordRegex)).messages({
    'string.min': INCORRECT_PASSWORD,
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'string.pattern.base': INCORRECT_PASSWORD,
    'any.required': '400|Password deve existir',
  }),
});

// esquema para verificar se o usuário existe
const checkUserSchema = joi.object({
  identifier: joi.alternatives().try(joi.string().email(), joi.string().min(3)).required().messages({
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'alternatives.try': INVALID_FIELDS,
    'any.required': '400|Identifier deve existir',
  }),
});

// schema para inserir uma nova ordem
const checkoutSchema = joi.object({
  userId: joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'string.pattern.base': '400|User ID inválido',
    'any.required': '400|User ID deve existir',
  }),
  totalPrice: joi.number().required().min(0).messages({
    'number.base': '400|Total Price deve ser um número',
    'number.min': '400|Total Price deve ser maior ou igual a 0',
    'any.required': '400|Total Price deve existir',
  }),
  withdrawalPointId: joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
    'string.empty': ALL_FIELDS_MUST_BE_FILLED,
    'string.pattern.base': '400|Withdrawal Point ID inválido',
    'any.required': '400|WithdrawalPointId deve existir',
  }),
  saleDate: joi.date().required().messages({
    'date.base': '400|Sale Date deve ser uma data válida',
    'any.required': '400|Sale Date deve existir',
  }),
  products: joi.array().items(
    joi.object({
      productId: joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
        'string.empty': ALL_FIELDS_MUST_BE_FILLED,
        'string.pattern.base': '400|Product ID inválido',
        'any.required': '400|Product ID deve existir',
      }),
      quantity: joi.number().integer().required().min(1).messages({
        'number.base': '400|Quantity deve ser um número',
        'number.integer': '400|Quantity deve ser um número inteiro',
        'number.min': '400|Quantity deve ser maior ou igual a 1',
        'any.required': '400|Quantity deve existir',
      }),
    })
  ).required(),
  cashbackValue: joi.number().required().min(0).messages({
    'number.base': '400|Cashback Value deve ser um número',
    'number.min': '400|Cashback Value deve ser maior ou igual a 0',
    'any.required': '400|Cashback Value deve existir',
  }),
});

module.exports = { loginSchema, registerSchema, checkUserSchema, checkoutSchema };