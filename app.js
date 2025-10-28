import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import expressSession from "express-session"
import flash from "connect-flash"
import dotenv from "dotenv"
dotenv.config({ path: "./.env" });
const app = express()

// connecting ejs
app.set("view engine","ejs")
app.set("views",path.resolve('./views'));

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))  
app.use(cookieParser());
app.use(express.static(path.resolve('./public')))
app.use(expressSession({resave: false, saveUninitialized: false, cookie: { secure: false }, secret: process.env.EXPRESS_SESSION_SECRET}))
app.use(flash())

// router import
import homeRouter from "./routes/index.js"
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import ownerRouter from "./routes/owner.route.js"

// router declaration
app.use("/", homeRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/owners", ownerRouter)

export {app}