require("dotenv").config()

const mongoose = require('mongoose')

const URL = process.env.DATABASE_URI

const connectDB = async()=>{
    try {
        const connect_the_database = await mongoose.connect(URL)
        console.log("connected to the host->", connect_the_database.connection.host)
    } catch (error) {
        console.log("database connection failed", error)
        process.exit(1)
    }
}

module.exports = connectDB