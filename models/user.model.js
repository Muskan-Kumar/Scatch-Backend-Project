import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
}, {timestamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return null
    await bcrypt.hash(this.password, 10)
    next()
})

userSchema.method.isPasswordCorrect = async function(password){
    await bcrypt.compare(password, this.password)
}

userSchema.method.generateAccessToken = async function(){
    jwt.sign(
        {
            id: this._id,
            fullname: this.fullname,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.generateRefreshToken = async function(){
    jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)