const {Schema, model} = require("mongoose");

// Define the Flight Schema
const flightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true
  },
  airline: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/, // the date is in YYYY-MM-DD format
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, 
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0, 
  },
});

// Create the Flight Model
const Flight = new model("flight", flightSchema);

module.exports = Flight;
