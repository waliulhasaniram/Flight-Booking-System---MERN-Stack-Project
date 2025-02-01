const Flight = require("../Flights/flight.model")
const Booking = require("../Booking/booking.mode")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const asyncHandler = require("../utils/asyncHandler")
const Users = require("../Users/user.model")

const addFlight = asyncHandler(async(req, res)=>{
    try {
        let { flightNumber, airline, origin, destination, date, time, price, availableSeats } = req.body;
        
        price = Number(price)
        availableSeats = Number(availableSeats)

        const newFlight = await Flight.create({
            flightNumber, airline, origin, destination, date, time, price, availableSeats });

        if (!newFlight) {
            throw new ApiError(400, "Cannot save flight data");
        }

        res.status(200).json(new ApiResponse(200, newFlight, "New flight data created successfully"));
    } catch (error) {
        console.error("Error adding flight:", error);
        throw new ApiError(500, "Internal Server Error");
    }
})

const updateFlight =asyncHandler(async(req, res)=>{
    const id = req.params.id
    if(!id) {throw new ApiError(400, "id not found")}

    const updatedFlightOnform = req.body
    if(!updatedFlightOnform) {throw new ApiError(400, "user new data not found")}

    const updateFlightData = await Flight.updateOne({_id:id}, {$set: updatedFlightOnform})

    res.status(200).json(new ApiResponse(200, updateFlightData, "data updated"))
})

const deleteFlight = asyncHandler(async(req, res)=>{
    const id = req.params.id

    if(!id) {throw new ApiError(400, "id not found")}

    const deleteFlight = await Flight.deleteOne({_id:id})
    res.status(200).json(new ApiResponse(200, {}, "one user deleted"))
})

const seeBookedFLight =asyncHandler(async(req, res)=>{
    const allBooking = await Booking.find({})

    const flightIds = allBooking.map(booking => booking.flightId)
    const userIds = allBooking.map(booking => booking.userId)

    const userData = await Users.find({_id:userIds})
    const flightData = await Flight.find({_id:flightIds})

    res.status(200).json(new ApiResponse(200, {allBooking, userData, flightData}, "all booked data"))
})

const updateBookingData =asyncHandler(async(req, res)=>{
    const id = req.params.id
    if(!id) {throw new ApiError(400, "id is required for updating booking")}

    const updated_Booking = req.body
    if(!updated_Booking) {throw new ApiError(400, "new booking data not found")}

    const updateBooking = await Booking.findByIdAndUpdate({_id:id}, {$set: updated_Booking})

    res.status(200).json(new ApiResponse(200, updateBooking, "booking data updated"))
})

const deleteBooking = asyncHandler(async(req, res)=>{
    const id = req.params.id
    if(!id) {throw new ApiError(400, "id not found")}

    const deleteOneBooking = await Booking.deleteOne({_id:id})
    res.status(200).json(new ApiResponse(200, {}, "one user deleted"))
})

module.exports = {addFlight, updateFlight, deleteFlight, seeBookedFLight, updateBookingData, deleteBooking}