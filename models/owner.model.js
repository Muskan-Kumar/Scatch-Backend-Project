import mongoose from "mongoose"

const ownerSchema = mongoose.Schema({
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
    product: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String,
    gstN: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Owner = mongoose.model("Owner", ownerSchema)