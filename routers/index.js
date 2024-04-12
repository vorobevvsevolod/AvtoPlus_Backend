const Router = require('express');
const router = new Router();

const userRouter = require('./user-router')
const categoryRouter = require('./category-router')
const worksRouter = require('./works-router')
const materialsRouter = require('./materials-router')
const galleryWorksRouter = require('./galleryWorks-router')
const deliveryLocationRouter = require('./deliveryLocation-router')


router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/works', worksRouter)
router.use('/galleryworks', galleryWorksRouter)
router.use('/materials', materialsRouter)
router.use('/deliverylocation', deliveryLocationRouter)



module.exports = router