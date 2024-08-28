import mongoose from "mongoose";


const AdminSchema  =  new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin"
    },
    lastLogin:{
        type:String
    }
},{timestamps:true})



export const Admin =  mongoose.models.Admin || mongoose.model("Admin",AdminSchema);