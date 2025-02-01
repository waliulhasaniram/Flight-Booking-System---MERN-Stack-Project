const express = require('express')
const router = express()
const flightController = require('./flight.controller')


router.route('/flights').get(flightController.getAllFlights)

router.route('/flights/search').get(flightController.searchFlights)

router.route('/flights/:_id').get(flightController.getSingleFlight)

router.route('/flight/airline').get(flightController.filterFlight)

router.route('/flight/apply-filter').get(flightController.applyFilter)

module.exports = router