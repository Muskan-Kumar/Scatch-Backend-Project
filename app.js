import express from "express"
import cookieParser from "cookie-parser"
import path from "path"

const app = express()

// connecting ejs
app.set("view engine","ejs")
app.set("views",path.resolve('./views'));

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))  
app.use(cookieParser());
app.use(express.static(path.resolve('./public')))

app.get("/",(req, res)=>{
    return res.send("heyyy muskan")
})

// router import
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import ownerRouter from "./routes/owner.route.js"

// router declaration
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/owners", ownerRouter)

export {app}