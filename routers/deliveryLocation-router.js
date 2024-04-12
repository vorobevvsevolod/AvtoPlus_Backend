const Router = require('express');
const router = new Router();
const DeliveryLocationController = require('../controllers/DeliveryLocation-controller');

router.get('/', DeliveryLocationController.get)

module.exports = router