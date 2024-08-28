import { NextResponse, NextRequest } from "next/server";
import { Admin } from "@/model/Admin/Admin.Model";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";
import { DB } from "@/Database/database";
import { cookies } from "next/headers";

DB();

export const POST = async (request: NextRequest) => {
    try {
        const { email, password } = await request.json();

        // Log incoming request data
        console.log("Received email:", email);
        console.log("Received password:", password);

        const findUser = await Admin.findOne({ email });

        if (!findUser) {
            console.log("User not found for email:", email);
            return NextResponse.json({ message: "user not found" }, { status: 404 });
        }

        const hashedPassword = createHash('sha256').update(password).digest('hex');

        if (findUser.password !== hashedPassword) {
            console.log("Incorrect password for user:", email);
            return NextResponse.json({ message: "Wrong Password" }, { status: 404 });
        }

        const Cookie = cookies();
        const userInfo = {
            id: findUser._id,
            email: findUser.email,
            role: "admin"
        };

        const token = jwt.sign(userInfo,"mysecert", {
            expiresIn: '1h'
        });

        Cookie.set("auth", token, {
            httpOnly: true,
            secure: true, // Defaults to true in production
            maxAge: 60 * 60, // 1 hour in seconds
        });

        console.log("Admin logged in, token set");
        return NextResponse.json({ message: "Hello Admin" }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/admin/login:", error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
};
