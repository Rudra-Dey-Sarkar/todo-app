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


export const PUT = async (req: NextRequest) => {
  const data = await req.json();
  const { id, ...AllData } = data;

  try {
    if (!data.steps) {
      const response = await tasksModel.findOneAndUpdate({ _id: id }, { $set: AllData }, { new: true });
      if (response.length > 0 || response !== null) {
        return NextResponse.json({ status: 200, message: response });
      } else {
        return NextResponse.json({ status: 404, message: "Cannot Edit Tasks" });
      }
    } else {
      const response = await tasksModel.findOneAndUpdate({ _id: id }, { $push: AllData }, { new: true });
      if (response.length > 0 || response !== null) {
        return NextResponse.json({ status: 200, message: response });
      } else {
        return NextResponse.json({ status: 404, message: "Cannot Edit Tasks" });
      }
    }
  } catch (errors) {
    return NextResponse.json({ status: 400, message: errors });
  }
}