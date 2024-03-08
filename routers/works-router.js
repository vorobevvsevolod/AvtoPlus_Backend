const Router = require('express');
const router = new Router();
const WorksController = require('../controllers/Works-controller');

router.get('/', WorksController.get)

module.exports = router