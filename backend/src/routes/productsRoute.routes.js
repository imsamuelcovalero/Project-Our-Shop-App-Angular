// productRoute.routes.js em backend/src/routes
const { Router } = require('express');

const { getAllProducts } = require('../controllers/productController');

const router = Router();

router.get('/', getAllProducts);

module.exports = router;