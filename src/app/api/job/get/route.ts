import { DB } from "@/Database/database";
import { NextResponse,NextRequest } from "next/server";
import { Job } from "@/model/Job/Job.model";


DB()
export const GET = async(request:NextRequest) =>{
        try {
           try {
             const data = await Job.find({}).sort({createdAt:-1});
             return NextResponse.json({"message":"created","data":data},{status:200})
           } catch (error) {
            return NextResponse.json({"message":error},{status:500})
           }

        } catch (error) {
            return NextResponse.json({"message":error},{status:500})
            
        }



}