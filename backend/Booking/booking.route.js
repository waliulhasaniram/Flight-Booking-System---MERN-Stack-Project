const express = require('express')
const router = express()
const bookingController = require('./booking.controller')
const verifyToken = require('../Users/user.middleware')

router.route('/bookings/:id').post(verifyToken, bookingController.BookTheFlight)

router.route('/bookings/user').get(verifyToken, bookingController.UsersBookedFlight)

module.exports = router