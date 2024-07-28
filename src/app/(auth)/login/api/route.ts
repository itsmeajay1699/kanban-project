import { NextRequest, NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);
    return NextResponse.json({ email, password });
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message);
  }
}
