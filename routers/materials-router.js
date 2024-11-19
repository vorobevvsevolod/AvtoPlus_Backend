const Router = require('express');
const router = new Router();
const MaterialsController = require('../controllers/Materials-controller');

router.get('/', MaterialsController.get)

router.get('/:id', MaterialsController.getById)

module.exports = router