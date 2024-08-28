import { NextRequest,NextResponse } from "next/server";
import { User } from "@/model/User/User.model";
import { createHash } from "crypto";
import { DB } from "@/Database/database";


DB()
export const POST = async(request:NextRequest)=>{
    try {
        const {email,password}  = await  request.json();
        if(!email && !password){
            return NextResponse.json({"message":"Every Field is required"},{status:404})
        }

        const findUser = await User.findOne({
            email:email
        });

        if(findUser){
            return NextResponse.json({"message":"User exist"},{status:404})
        }
        const hashedPassword = createHash('sha256').update(password).digest('hex');

        const newUser = await new User({
            email,
            password:hashedPassword
        })

        await newUser.save()

        return NextResponse.json({"message":"User create"},{status:200})
    } catch (error) {
        return NextResponse.json({"message":error},{status:500})
    }

}