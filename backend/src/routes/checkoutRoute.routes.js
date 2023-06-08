// checkoutRoute.routes.js em backend/src/routes
const { Router } = require('express');

const { getAllWithdrawalPoints } = require('../controllers/withdrawalPointController');
const { createNewOrder } = require('../controllers/orderController');
const { validateCheckout } = require('../middlewares/validators');

const router = Router();

router.get('/', getAllWithdrawalPoints);
router.post('/', validateCheckout, createNewOrder);

module.exports = router;