import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { Profile } from "@/model/Profile/Profile.model";
import jwt from "jsonwebtoken"
import { Job } from "@/model/Job/Job.model";

export const GET = async (req: NextRequest) => {
    try {
        const cookie = cookies()
        const userCookie = cookie.get('token')
        if (!userCookie) {
            return NextResponse.json({ "message": "log in please" }, { status: 404 })
        }
        // console.log(userCookie)
        const token = jwt.verify(userCookie?.value, "mysecret") as any;
        // console.log(token.id)
        const data = await Profile.find({ userInfo: token?.id })
        // console.log(data[0].appliedJobs)
        const userJobs = data[0].appliedJobs;
        // console.log(userJobs)


        // Fetch detailed job information from the Job model
        const jobDetails = await Job.find({
            _id: { $in: userJobs },
        });
        // console.log(jobDetails)
        // console.log(jobs)
        return NextResponse.json({ "message": "cookie getted", "data": data,"jobs":jobDetails }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ "message": error }, { status: 500 })
    }
}