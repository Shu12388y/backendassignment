import mongoose from "mongoose";


const ProjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    About:{
        type:String
    },
    link:{
        type:String
    }
});


const ExperienceSchema = new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    StartDate:{
        type:String
    },
    EndDate:{
        type:String
    },
    About:{
        type:String
    },
    location:{
        type:String
    }
});


const EducationSchema = new mongoose.Schema({
    name:{
        type:String
    },
    Type:{
        type:String
    },
    startDate:{
        type:String
    },
    EndDate:{
        type:String
    }
})


const AppliedJobs = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Jobs'
    }
});

const ProfileSchmea = new mongoose.Schema({
    userInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Username:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    experience:{
        type:[ExperienceSchema],
    },
    projects:{
        type:[ProjectSchema],
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String
    },
    education:{
        type:[EducationSchema]
    },
    appliedJobs:{
        type:[AppliedJobs]
    }

});


export const Profile = mongoose.models.Profile || mongoose.model("Profile",ProfileSchmea) 