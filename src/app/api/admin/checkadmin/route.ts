import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken"


export const GET = async(request:NextRequest)=>{
    try {
        const cookie =  cookies()
        const adminCookie = cookie.get('auth');
        if(!adminCookie){
            return NextResponse.json({"message":"Login please"},{status:301})
        }
        const userInfo =  jwt.verify(adminCookie?.value,"mysecert") as any;
        if(userInfo?.role != "admin"){
                return NextResponse.json({"message":"User not Admin"},{status:401})
        }
        return NextResponse.json({"message":"Cookie got"},{status:200})

    } catch (error) {
        return NextResponse.json({"message":error},{status:500})
    }
}