const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { productSchema } = require('../validation');
const controller = require('../controllers/productController');

router.get('/', controller.getAll);
router.get('/category/:category', controller.getByCategory )
router.get('/:id', controller.getOne);
router.post('/', auth, validate(productSchema), controller.create);
router.delete('/:id', auth, controller.remove);
module.exports = router;
