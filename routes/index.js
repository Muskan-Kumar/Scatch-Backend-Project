import express from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addToCart, handleCart, handleIndex, handleLogout, handleShop } from "../controllers/index.controller.js"

const router = express.Router()

router.get("/", handleIndex)
router.get("/shop", verifyJWT, handleShop)
router.get("/cart", verifyJWT, handleCart)
router.get("/addtocart/:productid", verifyJWT, addToCart)
router.get("/logout", verifyJWT, handleLogout)

export default router
 