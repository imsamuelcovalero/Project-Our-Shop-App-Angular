const { Router } = require('express');

const loginRoute = require('./loginRoute.routes');
const registerRoute = require('./registerRoute.routes');
const productRoute = require('./productsRoute.routes');
const orderRoute = require('./ordersRoute.routes');
const checkoutRoute = require('./checkoutRoute.routes');

const router = Router();

router.use('/login', loginRoute);
router.use('/register', registerRoute);
router.use('/products', productRoute);
router.use('/orders', orderRoute);
router.use('/checkout', checkoutRoute);

module.exports = router;