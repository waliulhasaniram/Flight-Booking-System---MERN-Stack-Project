const express = require('express')
const router = express()
const userController = require('./user.controller')
const verifyToken = require('./user.middleware')
const { validateRegister } = require('../validation/validate-Middleware')
const { registerSchema } = require('../validation/auth-validator')

router.route('/').get(userController.home)

router.route('/register').post(validateRegister(registerSchema), userController.register)

router.route('/login').post(userController.login)

router.route('/logout').post(verifyToken, userController.logout)

router.route('/user').get(verifyToken, userController.userInfo)

router.route('/update-user').patch(verifyToken, userController.updateUserData)

module.exports = router