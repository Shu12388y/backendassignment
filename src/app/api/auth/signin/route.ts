import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/User/User.model";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { DB } from "@/Database/database";
import jwt, { JwtPayload } from "jsonwebtoken"


DB()
export const POST = async (Request: NextRequest) => {
    try {
        const { email, password } = await Request.json();
        if (!email && !password) {
            return NextResponse.json({ "message": "Every fieldis required" }, { status: 404 })
        }
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        const findUser = await User.findOne({
            email: email
        })

        if (!findUser) {
            return NextResponse.json({ "message": "User not exist" }, { status: 404 })
        }

        if (findUser.password != hashedPassword) {
            return NextResponse.json({ "message": "Wrong Password" }, { status: 404 })
        }
        const userInfo = {
            id:findUser._id,
            email:findUser.email
        }
        const cookieSetter=  jwt.sign(userInfo, "mysecert") as unknown;
        const cookieStore = cookies();
        cookieStore.set('token',cookieSetter as string)
        return NextResponse.json({ "message": "user sigin" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ "message": error }, { status: 500 })
    }
}