const {z} = require('zod')

const registerSchema = z.object({
    username: z
    .string({required_error: "name is required"})
    .min(3, {message: "name must have 3 chars"})
    .max(30, {message: "name cannot have more than 30 chars"})
    .trim(),

    email: z
    .string({required_error: "email is required"})
    .trim()
    .email({message: "this is not a email"}),

    password: z
    .string({required_error: "password is required"})
    .trim()
    .min(5, {message: "minimum 5 chars in the password"})
    .max(32, {message: "maximum 32 chars in the password"}),    
})

const flightAddSchema = z.object({
    flightNumber: z
    .string({required_error: "flight number is required"})
    .min(3, {message: "flight number must have 3 chars"})
    .max(10, {message: "flight number cannot have more than 10 chars"})
    .trim(),

    airline: z
    .string({required_error: "airline name is required"})
    .min(3, {message: "airline must have 3 chars"})
    .max(32, {message: "airline cannot have more than 32 chars"})
    .trim(),

    origin: z
    .string({required_error: "origin name is required"})
    .min(3, {message: "origin must have 3 chars"})
    .max(32, {message: "origin cannot have more than 32 chars"})
    .trim(),
    
    destination: z
    .string({required_error: "destination name is required"})
    .min(3, {message: "destination must have 3 chars"})
    .max(32, {message: "destination cannot have more than 32 chars"})
    .trim(),

    date: z
    .string({required_error: "date name is required"})
    .trim(),

    time: z
    .string({required_error: "time name is required"})
    .trim(),

    price: z
    .number({required_error: "price is required"}),
    
    availableSeats: z
    .number({required_error: "price is required"}),
})

module.exports = {registerSchema, flightAddSchema}