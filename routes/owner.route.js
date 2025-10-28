import express from "express"
import { Owner } from "../models/owner.model.js"

const router = express.Router()

if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req, res)=>{
        let owner = await Owner.find();
        if(owner.length > 0){
            return res.status(503).send("You don't permission to create a new owner.")
        }
        const {fullname, email, password} = req.body;

        const createdOwner = await Owner.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner)
    })
}



// routes
router.get("/admin", (req,res)=>{
    const success = req.flash("success")
    res.render("createproducts", { success })
})

export default router