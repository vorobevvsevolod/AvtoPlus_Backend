const Router = require('express');
const router = new Router();
const CategoryController = require('../controllers/Category-controller');

router.get('/', CategoryController.get)

module.exports = router