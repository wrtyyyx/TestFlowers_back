const router = require('express').Router();
const validate = require('../middleware/validate');
const {  regestrationSchema, loginSchema } = require('../validation');
const ctrl = require('../controllers/authController');
const auth = require('../middleware/auth');



router.post('/register', validate(regestrationSchema), ctrl.register);
router.post('/login', validate(loginSchema), ctrl.login);
router.delete('/:id', auth, ctrl.deleteUser);

module.exports = router;