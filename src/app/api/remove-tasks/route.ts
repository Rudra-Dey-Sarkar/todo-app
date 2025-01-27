"use server"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"

const tasksSchema = new mongoose.Schema({
  userId: String,
  taskName: String,
  date: String,
  steps: [String],
  notes:String,
  important: { type: Boolean, default: false },
  reminder: { type: Boolean, default: false },
  status: { type: Boolean, default: false },
},
  { collection: "tasks" });

const tasksModel = mongoose.models.tasks || mongoose.model("tasks", tasksSchema);


export const DELETE = async (req: NextRequest) => {
  const data = await req.json();

  try {

    const response = await tasksModel.findOneAndDelete({ _id: data?.id });
    if (response.length > 0 || response !== null) {
      return NextResponse.json({ status: 200, message: response });
    } else {
      return NextResponse.json({ status: 404, message: "Cannot Remove Tasks" });
    }

  } catch (errors) {
    return NextResponse.json({ status: 400, message: errors });
  }
}