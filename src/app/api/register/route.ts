"use server"
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import ConnectDB from "../../../../actions/db";

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
},
    { collection: "users" });

const userModel = mongoose.models.users || mongoose.model("users", usersSchema);

export const POST = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();
    
    const allData = {
        name: data.name,
        email: data.email,
        password: data.password
    }

    try {
        const response = await userModel.find({ email: data?.email });

        if (response.length > 0) {
            return NextResponse.json({ status: 404, message: "User already exists" });
        } else {
            const response = await userModel.insertMany([allData]);
            if (response.length > 0) {
                return NextResponse.json({ status: 200, message: response });
            } else {
                return NextResponse.json({ status: 400, message: "Cannot insert data" });
            }
        }

    } catch (errors) {
        return NextResponse.json({ status: 400, message: errors });
    }

}