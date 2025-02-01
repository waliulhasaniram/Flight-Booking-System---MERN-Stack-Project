const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const asyncHandler = require("../utils/asyncHandler")
const Users = require("./user.model")

const home =asyncHandler((req, res)=> {
    res.status(200).json({msg: "this is flight home"})
})

const register = asyncHandler(async(req, res)=> {
    const {username, email, password} = req.body

    const ifUserExists = await Users.findOne({email:email})
    if(ifUserExists){
        throw new ApiError(409, "User already exists")
    }else{
        const createUser = await Users.create({username, email, password})

        if(!createUser) { throw new ApiError(500, "can't create new user")}

        res.status(201).json(new ApiResponse(201, createUser, "New user created"));
    }
})

const generateAccessAndRefreshToken = async(userId)=> {
    try {
        const userToken = await Users.findOne({_id: userId})
        const accessToken = await userToken.generateAccessToken()
        const refreshToken = await userToken.generateRefreshToken()

        userToken.refreshToken = refreshToken
        await userToken.save({validateBeforeSave: false})
        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(400, "can't generate access and refresh token")
    }
}

const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body

    const ifUserExists = await Users.findOne({email: email})

    if(!ifUserExists){
        throw new ApiError(400, "user doesn't exist")
    }else{
        const comparePassword = await ifUserExists.isPasswordCorrect(password)

        if(!comparePassword) {
            throw new ApiError(400, "invalid credentials")
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(ifUserExists._id)

        const userLogin = await Users.findOne({_id: ifUserExists._id}).select({password:0})
        
        const options={
            httpOnly : true,
            secure: true
        }

        res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).status(200)
        .json(new ApiResponse(200, {userLogin, accessToken, refreshToken}, "successfully loggedin"))

    }
})

const logout = asyncHandler(async(req, res)=>{
    await Users.findByIdAndUpdate(req.user._id, {$unset: {refreshToken:1}}, {new:true})

    const options = { httpOnly: true, secure: true}

    return res.clearCookie("accessToken", options).clearCookie("refreshToken", options).status(200)
    .json(new ApiResponse(200, {}, "logout successful"))
})

const userInfo = asyncHandler( async(req, res)=>{
    return await res.status(200).json(new ApiResponse(200, req.user, "logged in user data"))
})

const updateUserData = asyncHandler(async(req, res)=>{
    const {username, email} = req.body
    const id = req.user?._id
    const updateUserData = await Users.updateOne({_id:id}, {$set: {username, email}})

    if(!updateUserData) {throw new ApiError(400, "can't find updated data")}
    res.status(200).json(new ApiResponse(200, updateUserData, "user data updated"))

})

module.exports = {home, register, login, logout, userInfo, updateUserData}