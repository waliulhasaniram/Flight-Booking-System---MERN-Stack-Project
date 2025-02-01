const ApiError = require("../utils/ApiError")


const AdminMiddleware = (req, res, next)=>{
    try {
        const isHeAdmin = req.user?.isAdmin
        if(!isHeAdmin){
            throw new ApiError(400, "user is not an admin")
        }
        next()
    } catch (error) {
        throw new ApiError(500, "admin middleware problem")
    }
}

module.exports = AdminMiddleware