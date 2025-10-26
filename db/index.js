import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDb connected sucessfully!!")
    } catch (error) {
        console.log("MongoDb not connected", error)
        process.exit(1)
    }
}

