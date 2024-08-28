import { DB } from "@/Database/database";
import { NextResponse,NextRequest } from "next/server";
import { Job } from "@/model/Job/Job.model";


DB()
export const POST = async(request:NextRequest) =>{
        try {
           try {
            const {jobId} = await request.json()
            console.log(jobId)
             const data = await Job.findById({_id:jobId})
             return NextResponse.json({"message":"created","data":data},{status:200})
           } catch (error) {
            return NextResponse.json({"message":error},{status:500})
           }

        } catch (error) {
            return NextResponse.json({"message":error},{status:500})
            
        }



}