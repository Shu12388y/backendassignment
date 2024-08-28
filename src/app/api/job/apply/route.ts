import { NextResponse,NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { Job } from "@/model/Job/Job.model";
import { Profile } from "@/model/Profile/Profile.model";


export const POST = async(request:NextRequest)=>{
    try {
        const Cookie = cookies()
        const userCookie = Cookie.get('token') as any;
        // console.log(userCookie)
        const userData = jwt.verify(userCookie.value,"mysecret") as any;
        // console.log(userData)

        const userId = userData.id;
        const {jobid} =  await request.json();
        console.log(jobid)
        const appliedUser  = await Profile.findOne({userInfo:userId})
        appliedUser.appliedJobs.push(jobid); // Ensure the correct data structure
        await appliedUser.save(); // Save the document after modification
        // const jobsUser  = await Job.findOne({_id:jobid})
        // await jobsUser.AppliedUser.push({userId})
        const jobsUser  = await Job.findById({_id:jobid})
        await jobsUser.AppliedUser.push(userId)
        await jobsUser.save()
        // console.log(jobsUser)

        return NextResponse.json({"message":"got the cookie"},{status:202}) 
    } catch (error) {
        return NextResponse.json({"message":error},{status:500})
    }
}