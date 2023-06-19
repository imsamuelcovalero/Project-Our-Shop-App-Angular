/* File: src/routes/registerRoute.routes.js */
const { Router } = require('express');

const { register, checkUserExists } = require('../controllers/userController');
const { validateRegister, validateCheckUserExists } = require('../middlewares/validators');

const router = Router();

router.post('/', validateRegister, register);
router.post('/check', validateCheckUserExists, checkUserExists);

module.exports = router;