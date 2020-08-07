const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const orderController = require('../controllers/order');

// @ Gfetch order
router.get('/',auth,orderController.getAllOrders);

// @ submit and order
router.post('/', auth,orderController.storeOrder);

// @ Get a single order
router.get('/:orderId',auth,orderController.getOrder);

// @ delete an order
router.delete('/:orderId',auth,orderController.deleteOrder);

module.exports = router;
