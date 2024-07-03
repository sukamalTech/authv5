import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) return NextResponse.json(req.auth);
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
