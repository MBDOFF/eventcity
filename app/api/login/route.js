const sdk = require("node-appwrite");
const crypto = require("crypto");

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  return NextResponse.json({ data });
}
