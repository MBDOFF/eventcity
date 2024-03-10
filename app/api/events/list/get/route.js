import { databases, sdk, daysUntilDate } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  if (!data.id) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const response = await databases.getDocument(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    data.id
  );

  return NextResponse.json(response);
}
