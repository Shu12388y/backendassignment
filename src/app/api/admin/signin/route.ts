import { NextResponse, NextRequest } from "next/server";
import { Admin } from "@/model/Admin/Admin.Model";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";
import { DB } from "@/Database/database";
import { cookies } from "next/headers";


DB()
export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json()
        const findUser = await Admin.findOne({
            email: email
        })
        if (!findUser) {
            return NextResponse.json({ "message": "user not found" }, { status: 404 })
        }
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        if (findUser.password != hashedPassword) {
            return NextResponse.json({ "message": "Wrong Password" }, { status: 404 })
        }
        const Cookie = cookies()
        const userInfo = {
            id: findUser._id,
            email: findUser.email,
            role: "admin"
        }
        const token = await jwt.sign(userInfo, "mysecert", { expiresIn: '1h' }) as any;
        Cookie.set("auth", token as string, {
            httpOnly: true,
            secure: true, // Default value for secure is true
            maxAge: 60 * 60, // 1 hour in seconds
        })
        return NextResponse.json({ "message": "Hello Admin" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ "message": error }, { status: 500 })
    }
}