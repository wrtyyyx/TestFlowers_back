const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');


router.post('/', orderController.createOrder);

router.get('/user/:userId', orderController.getUserOrders);
router.delete('/user/:userId', orderController.deleteUserOrders);

router.get('/:id', orderController.getOrderById);
router.delete('/:id',auth, orderController.deleteOrder);




module.exports = router;