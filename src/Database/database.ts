import mongoose from "mongoose";


export const DB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.DB!)
        if(connect){
            console.log("db connected")
        }
    } catch (error) {
        console.error(error)
    }
}