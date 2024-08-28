import mongoose, { mongo } from "mongoose";


const AppliedUserSchema = new mongoose.Schema({
    userProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    }
})


const JobSchema = new mongoose.Schema({
    Role:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    AppliedUser:{
        type:[AppliedUserSchema]
    },
    yearsOfExperience:{
        type:String,
        required:true
    },
    Compensation:{
        type:String,
        required:true
    }
},{timestamps:true})


export const Job  = mongoose.models.Job || mongoose.model("Job",JobSchema);