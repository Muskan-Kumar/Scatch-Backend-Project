import express from "express"

const router = express.Router()

// routes
router.get("/", (req,res)=>{
    return res.send("product route")
})

export default router