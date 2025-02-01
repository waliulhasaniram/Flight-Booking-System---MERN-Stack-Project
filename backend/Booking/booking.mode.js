const {Schema, model} = require('mongoose')

const bookingSchema = new Schema({
    number_of_seats : {
        type: String,
        require: true
    },
    total_price : {
        type: String,
        require: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    flightId : {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    }
})

const Booking = new model('booking', bookingSchema)

module.exports = Booking