import { Product } from "../models/product.model.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const productSave = asyncHandler(async(req, res)=>{
    const {name, price, discount,bgcolor, panelcolor, textcolor} = req.body;

    if(!name || !price){
        throw new apiError(400, "name & price both are required.")
    }

    const product = await Product.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })

    req.flash("success", "Product created successfully.")
    res.redirect("/owners/admin")
})

export {productSave}