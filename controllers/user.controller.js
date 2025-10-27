import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"

const generateAccessAndRefreshToken = async(userId)=>{
    try {
       const user = await User.findById(userId)
       const accessToken = user.generateAccessAndRefreshToken
       const refreshToken = user.generateRefreshToken
       
       user.refreshToken = refreshToken
       user.save({validateBeforeSave: false})

       return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(400, "Something went wrong when user want to login")
    }
}


const userRegister = asyncHandler(async(req, res)=>{
    const {fullname, email, password} = req.body;

    if(!fullname || !email || !password){
        throw new apiError(400, "All fields are required.")
    }

    const existUser = await User.findOne({email})

    if(existUser){
        throw new apiError(400, "User already exist, Please login")
    }

    const user = await User.create({
        fullname,
        email,
        password
    })

    const createdUser = await User.findById(user?._id).select("-password")

    return res.status(201)
    .json(new apiResponse(200, createdUser, "User Register Successfully.")) 
})

const userLogin = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new apiError(400, "All fields are required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new apiError(400, "User does not exist")
    }

    const isPassword = await user.isPasswordCorrect(password)
    if(!isPassword){
        throw new apiError(400, "Password is InCorrect")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const userLogin = await User.findById(user._id).select("-passsword -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new apiResponse(200, {userLogin, accessToken, refreshToken}, "User login successfully."))

})



export {userRegister, userLogin}