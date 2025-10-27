import express from "express"
import { userLogin, userRegister } from "../controllers/user.controller.js"


const router = express.Router()

// routes
router.get("/", (req,res)=>{
    return res.send("user route")
})

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)

 
export default router
