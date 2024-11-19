const Router = require('express');
const router = new Router();
const WorksController = require('../controllers/Works-controller');

router.get('/', WorksController.getAllTitle)
router.get('/:id', WorksController.getById)

module.exports = router