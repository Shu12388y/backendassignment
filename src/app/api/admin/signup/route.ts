import { NextResponse,NextRequest } from "next/server";
import { Admin } from "@/model/Admin/Admin.Model";
import { createHash } from "node:crypto";
import { DB } from "@/Database/database";



DB()
export const POST = async(request:NextRequest) =>{
    try {
        const {email,password} =  await  request.json()
        const findUser =  await Admin.findOne({
            email:email
        })    
        console.log(findUser)
        if(findUser){
            return NextResponse.json({"message":"user found"},{status:404})
        }
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        const newUser  =  await new Admin({
            email,
            password:hashedPassword
        })
        await newUser.save()
        return NextResponse.json({"message":"Hello Admin"},{status:200})
    } catch (error) {
                return NextResponse.json({"message":error},{status:500})   
    }
}