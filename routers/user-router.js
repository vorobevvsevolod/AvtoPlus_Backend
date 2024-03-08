const Router = require('express');
const router = new Router();
const UserController = require('../controllers/user-controller')
const AuthorizationMiddleware = require('../middleware/authorizationMiddleware')

router.post('/login', UserController.login)

router.get('/me', AuthorizationMiddleware, UserController.getInfo)

router.put('/username', AuthorizationMiddleware, UserController.changeUsername)

router.put('/email', AuthorizationMiddleware, UserController.changeEmail)

router.put('/phone', AuthorizationMiddleware, UserController.changePhone)

module.exports = router