const asyncHandler = require("../utils/asyncHandler");
const Booking = require("./booking.mode");
const Flight = require("../Flights/flight.model");
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const BookTheFlight = asyncHandler(async(req, res)=>{
    const {number_of_seats, total_price} = req.body

    const book_the_flight = await Booking.create({
        number_of_seats : number_of_seats,
        total_price : total_price,
        flightId : req.params.id, 
        userId : req.user?._id,
    })

    if(!book_the_flight) {
        throw new ApiError(400, "booking data not found")
    }

    res.status(200).json(new ApiResponse(200, book_the_flight, "booking data"))
})

const UsersBookedFlight = asyncHandler(async(req, res)=>{
    const checkUserId = req.user?._id

    const findUsersBookedFlight = await Booking.find({userId : checkUserId})

    if(!findUsersBookedFlight) {
        throw new ApiError(400, "cannot find booked flight data")
    }
    const flightIds = findUsersBookedFlight.map(booking => booking.flightId)
   
    const findFlightFromId = await Flight.find({_id: flightIds})

    res.status(200).json(new ApiResponse(200, {findUsersBookedFlight, findFlightFromId}, "users all booked flight data"))
})

module.exports = {BookTheFlight, UsersBookedFlight}