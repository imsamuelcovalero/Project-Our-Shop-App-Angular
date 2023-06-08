// oderRoute.routes.js em backend/src/routes
const { Router } = require('express');

const { getUserOrders } = require('../controllers/orderController');
const { decode } = require('../middlewares/tokenFunctions');

const router = Router();

console.log('orderRoute.routes.js');

router.get('/', decode, getUserOrders);

module.exports = router;