require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connectDB = require('./utils/db/db')
const cors = require('cors')
const cookieParser = require("cookie-parser")

const userRouter = require('./Users/user.route')
const flightRouter = require('./Flights/flight.route')
const bookingRouter = require('./Booking/booking.route')
const adminRouter = require('./Admin/AdminRoute')

const options = {
    origin: process.env.FRONTEND_URL,
    method: "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
    credentials: true
}

app.use(cors(options))

app.use(express.json())

app.use('/api', userRouter)
app.use('/api', flightRouter)
app.use('/api', bookingRouter)
app.use('/api', adminRouter)
app.use(cookieParser())

connectDB().then(()=> {
    app.listen(port, ()=>{
        console.log(`this is the server: http://localhost:${port}`)
    })
})