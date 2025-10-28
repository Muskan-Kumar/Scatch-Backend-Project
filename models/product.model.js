import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    image: {
        type:Buffer,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        default: 0,
    },
    bgcolor: {
        type: String
    },
    panelcolor: {
        type: String
    },
    textcolor: {
        type: String
    }
}, {timestamps: true})

export const Product = mongoose.model("Product", productSchema);