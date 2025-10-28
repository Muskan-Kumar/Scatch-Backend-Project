import express from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { productSave } from "../controllers/product.controller.js"

const router = express.Router()

// routes
router.route("/create").post(upload.single("image"), productSave)

export default router