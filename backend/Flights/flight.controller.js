const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const Flight = require("./flight.model");

const getAllFlights = asyncHandler(async(req, res)=>{

    // const allFlights = await Flight.find({})
    // if(!allFlights){
    //     throw new ApiError(400, 'flight data not found')
    // }
    // res.status(200).json(new ApiResponse(200, allFlights, "all flights data"))

    const allData = await Flight.find({})

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3

    const startIndex = (page - 1)*limit  ///pagination formula  (1-1)*3=0
    const lastIndex = page*limit                              // 1*3=3

    const allFLights = {}
    allFLights.totalProduct = allData.length
    allFLights.pageCount = Math.ceil(allData.length/limit)

    if(lastIndex < allData.length) { allFLights.next = page+1}
    if(startIndex > 0) { allFLights.prev = page-1}
    
    allFLights.results = allData.slice(startIndex, lastIndex)


    if(!allFLights || allFLights.length === 0){ new ApiResponse(200, {}, "no product found")}

    res.status(200).json(new ApiResponse(200, allFLights, "all products"))
})

const searchFlights = asyncHandler(async(req, res) => {
    const {origin, destination} = req.query
    
    const search_Flight = {}

    if(origin){
        search_Flight.origin = {$regex: origin}
    }
    if(destination){
        search_Flight.destination = {$regex: destination}
    }
    
    const flights = await Flight.find(search_Flight)

    res.status(200).json(new ApiResponse(200, flights, "search flight"))

})

const getSingleFlight = asyncHandler(async(req, res)=>{
    const _id = req.params._id 
    const oneFlight =  await Flight.findById({_id:_id})
    if(!oneFlight){
        throw new ApiError(400, "flight data not found")
    }
    res.status(200).json(new ApiResponse(200, oneFlight, "flights data"))
})

/// fliter options link airline a, airline b
const filterFlight = asyncHandler(async (req, res) => {

    const getAirline = await Flight.find({}).select({ _id: 0, airline: 1, origin:1, destination:1 });

    if (getAirline.length === 0) {
        throw new ApiError(400, "airlines not found");
    }

    res.status(200).json(new ApiResponse(200, getAirline, "airline filter"));
})

const applyFilter = asyncHandler(async(req, res)=>{
    const {airline, origin, destination, sort, page, limit} = req.query

    const filterSearch = {}

    if(airline) {
        filterSearch.airline = airline
    }
    if(origin) {
        filterSearch.origin = origin
    }
    if(destination) {
        filterSearch.destination = destination
    }
  
    const skip = (Number(page) - 1) * Number(limit)

    let searchQuery = Flight.find(filterSearch)

    if(sort){
        const sortOrder = sort === 'asc' ? 1 : -1
        searchQuery = searchQuery.sort({ price: sortOrder })
    }

    const filterData = await searchQuery.skip(skip).limit(Number(limit))

    res.status(200).json(new ApiResponse(200, filterData, "These are filtered flight data"));
})


module.exports = {getAllFlights, getSingleFlight, filterFlight, searchFlights, applyFilter}