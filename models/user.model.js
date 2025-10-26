import mongoose from "mongoose"

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
    cart: {
        type: Array,
        default: []
    },
    isadmin: {
        type: boolean
    },
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)