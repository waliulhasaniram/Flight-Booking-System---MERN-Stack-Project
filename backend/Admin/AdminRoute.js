const express = require('express')
const router = express()
const verifyToken = require('../Users/user.middleware')
const AdminMiddleware = require('../Admin/AdminMiddleware')
const adminController = require('../Admin/AdminController')
const { validateFlightAdd } = require('../validation/validate-Middleware')
const { flightAddSchema } = require('../validation/auth-validator')

router.route('/addflight').post(verifyToken, AdminMiddleware, validateFlightAdd(flightAddSchema), adminController.addFlight)

router.route('/updateFlight/:id').put(verifyToken, AdminMiddleware, validateFlightAdd(flightAddSchema), adminController.updateFlight)

router.route('/delete/:id').delete(verifyToken, AdminMiddleware, adminController.deleteFlight)

router.route('/bookedFlight').get(verifyToken, AdminMiddleware, adminController.seeBookedFLight)

router.route('/update-booking-data/:id').put(verifyToken, AdminMiddleware, adminController.updateBookingData)

router.route('/delete-booking/:id').delete(verifyToken, AdminMiddleware, adminController.deleteBooking)

module.exports = router