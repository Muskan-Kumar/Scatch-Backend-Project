import dotenv from "dotenv"
import {app} from "./app.js"
import { connectDB } from "./db/index.js";


dotenv.config({
    path:'./.env'
})

// Port
const PORT = process.env.PORT || 3000;

// Database connected
connectDB()
.then(()=>{
    app.listen(PORT,()=>console.log(`Server start at PORT ${PORT}`))
})
.catch((err)=>{
    console.log("MongoDb connection failed", err)
})