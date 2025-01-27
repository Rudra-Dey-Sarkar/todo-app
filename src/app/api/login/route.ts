"use server"
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import ConnectDB from "../../../../actions/db";

const usersSchema = new mongoose.Schema({
    email: String,
    password: String
},
    { collection: "users" });

const userModel = mongoose.models.users || mongoose.model("users", usersSchema);

export const POST = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();

    try {
        const response = await userModel.find({ email: data?.email });

        if (response.length > 0) {

            if(response[0]?.password===data.password){
                return NextResponse.json({ status: 200, message: response });
            }else{
                return NextResponse.json({ status: 404, message: "Wrong Password" });
            }
        } else {
            return NextResponse.json({ status: 404, message: "User not found" });
        }

    } catch (errors) {
        return NextResponse.json({ status: 400, message: errors });
    }

}