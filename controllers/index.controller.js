import { Product } from "../models/product.model.js"
import { User } from "../models/user.model.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const handleIndex = asyncHandler(async (req, res)=>{
    const error = req.flash("error") 
    res.render("index", { error, verifyJWT: false })
})

const handleShop = asyncHandler(async (req, res)=>{
    const products = await Product.find()
    const success = req.flash("success")
    res.render("shop",{ products, success })
})

const handleCart = asyncHandler(async (req, res)=>{
    const user = await User.findOne({email: req.user.email}).populate("cart")
    
    const bill = (Number(user.cart[0].price)+20)- Number(user.cart[0].discount)

    res.render("cart", {user, bill})
})

const addToCart = asyncHandler(async (req, res)=>{
    const user = await User.findOne({email: req.user.email})
    user.cart.push(req.params.productid)
    await user.save();
    req.flash("success", "Added to cart")
    res.redirect("/shop")
})

const handleLogout = asyncHandler(async (req, res)=>{
    const error = req.flash("error") 
    res.render("index", { error, verifyJWT: false })
})


export {handleIndex, handleShop, handleCart, addToCart, handleLogout}