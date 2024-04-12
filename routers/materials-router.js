const Router = require('express');
const router = new Router();
const MaterialsController = require('../controllers/Materials-controller');

router.get('/', MaterialsController.get)

module.exports = router