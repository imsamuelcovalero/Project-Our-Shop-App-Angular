const { Router } = require('express');

const { register, checkUserExists } = require('../controllers/userController');
const validators = require('../middlewares/validators');

const router = Router();

router.post('/', validators.validateRegister, register);
router.post('/check', validators.validateCheckUserExists, checkUserExists);

module.exports = router;