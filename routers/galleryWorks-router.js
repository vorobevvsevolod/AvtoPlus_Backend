const Router = require('express');
const router = new Router();
const GalleryWorksController = require('../controllers/GalleryWorks-controller');

router.get('/', GalleryWorksController.get)
module.exports = router