import { NextResponse,NextRequest } from "next/server";
import { cookies } from "next/headers";

export const POST = async(request:NextRequest)=>{
    try {
        const cookie = cookies()
        cookie.set("token","") 
        return NextResponse.json({"message":"logout"},{status:200})
    } catch (error) {
        return NextResponse.json({"message":error},{status:500})
    }
}