import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"

export const verifyJWT = async(req, res, next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
        req.flash("error", "You need to login")
        return res.redirect("/")
    }
    try {
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeToken.id).select("-password -refreshToken")
        if(!user){
            throw new apiError(400, "Invalid access token")
        }
        req.user = user

        next()
    } catch (error) {
        req.flash("error", "something went wrong")
        res.redirect("/")
    }
}