const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const Users = require('./user.model');

const verifyToken = asyncHandler(async(req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "")
        
        if(!token){
            throw new ApiError(200, "token not found")
        }else{
            const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
            if(!verifyToken){
                throw new ApiError(200, "token is not verified")
            }else{
                const user = await Users.findOne({_id: verifyToken._id}).select({password: 0, refreshToken: 0})
    
                req.user = user
                next()
            }
        }
    } catch (error) {
        throw new ApiError(401, "token verification error")
    }
    
})

module.exports = verifyToken
