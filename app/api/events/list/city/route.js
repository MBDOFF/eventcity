import { sdk, databases, daysUntilDate, calcCrow } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  if (!data.city) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const eventResponse = await databases.listDocuments(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    [sdk.Query.limit(5000)]
  );

  if (!eventResponse) {
    return NextResponse.json({ error: "Events not found" }, { status: 400 });
  }

  return NextResponse.json(eventResponse.documents.filter(event => event.city.toLowerCase() === data.city.toLowerCase()));
}
