import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/User/User.model";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { DB } from "@/Database/database";
import jwt from "jsonwebtoken";

DB();

export const POST = async (Request: NextRequest) => {
    try {
        const { email, password } = await Request.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Every field is required" }, { status: 404 });
        }

        const hashedPassword = createHash('sha256').update(password).digest('hex');
        const findUser = await User.findOne({ email: email });

        if (!findUser) {
            return NextResponse.json({ message: "User does not exist" }, { status: 404 });
        }

        if (findUser.password !== hashedPassword) {
            return NextResponse.json({ message: "Wrong Password" }, { status: 404 });
        }

        const userInfo = {
            id: findUser._id,
            email: findUser.email
        };

        const token = jwt.sign(userInfo, "mysecret", { expiresIn: '1h' }); // Token expires in 1 hour
        const cookieStore = cookies();

        cookieStore.set('token', token as string, {
            httpOnly: true,
            secure: true, // Default value for secure is true
            maxAge: 60 * 60, // 1 hour in seconds
          });

        return NextResponse.json({ message: "User signed in" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error || "Internal Server Error" }, { status: 500 });
    }
};
