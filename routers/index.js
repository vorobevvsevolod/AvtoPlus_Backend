const Router = require('express');
const router = new Router();

const userRouter = require('./user-router')
const categoryRouter = require('./category-router')
const worksRouter = require('./works-router')
const galleryWorks = require('./galleryWorks-router')


router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/works', worksRouter)
router.use('/galleryworks', galleryWorks)



module.exports = router