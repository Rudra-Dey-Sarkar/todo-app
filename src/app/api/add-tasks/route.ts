"use server"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

const tasksSchema = new mongoose.Schema({
    userId: String,
    taskName: String,
    date: String,
    steps: [String],
    important: { type: Boolean, default: false },
    reminder: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
},
    { collection: "tasks" });

const tasksModel = mongoose.models.tasks || mongoose.model("tasks", tasksSchema);


export const POST = async (req: NextRequest) => {
    const data = await req.json();
    try {
        const response = await tasksModel.insertMany([data]);

        if (response.length > 0) {
            return NextResponse.json({ status: 200, message: response });
        } else {
            return NextResponse.json({ status: 404, message: "Cannot Add Tasks" });
        }
    } catch (errors) {
        return NextResponse.json({ status: 400, message: errors });
    }
}