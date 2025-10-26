import express from "express"

const router = express.Router()

// routes
router.get("/", (req,res)=>{
    return res.send("owner route")
})

export default router