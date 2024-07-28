import Task from "@/app/(models)/task";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { object } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { title, description, status, priority, deadline, createdBy } = data;

    if (!title || !description || !status || !priority || !createdBy) {
      return NextResponse.json({ message: "All fields are required" });
    }

    const ObjectId = new mongoose.Types.ObjectId(createdBy);

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      deadline,
      createdBy: ObjectId,
    });

    return NextResponse.json(task);
  } catch (err) {
    console.log(err);
  }
}
