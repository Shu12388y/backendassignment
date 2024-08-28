import { DB } from "@/Database/database";
import { NextResponse,NextRequest } from "next/server";
import { Job } from "@/model/Job/Job.model";


DB()
export const POST = async(request:NextRequest) =>{
        try {
           try {
             const {Role,companyName,description,location,Type,Compensation,yearsOfExperience} = await request.json();
             const jobs = await new Job({
                 Role,companyName,description,location,Type,yearsOfExperience,Compensation
             })
             await jobs.save()
 
             return NextResponse.json({"message":"created"},{status:200})
           } catch (error) {
            return NextResponse.json({"message":error},{status:500})
           }
        } catch (error) {
            return NextResponse.json({"message":error},{status:500})
            
        }



}