import { sdk, databases, daysUntilDate, calcCrow } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  const eventResponse = await databases.listDocuments(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    [sdk.Query.limit(5000)]
  );

  if (!eventResponse) {
    return NextResponse.json({ error: "Events not found" }, { status: 400 });
  }

  let distances = [];

  for (let i = 0; i < eventResponse.documents.length; i++) {
    const event = eventResponse.documents[i];
    let distance = 0;
    if (data.lat && data.lon) {
      distance = calcCrow(
        data.lat,
        data.lon,
        event.coords.split(",")[0],
        event.coords.split(",")[1]
      );
    }
    const days = daysUntilDate(event.date.split(":")[0]);
    distances.push({ id: event.$id, distance, days, i });
  }

  distances = distances.filter((event) => event.days >= 0);
  if (data.lat && data.lon) distances.sort((a, b) => a.days - b.days || a.distance - b.distance);
  distances[0].data = eventResponse.documents[distances[0].i];

  return NextResponse.json(distances);
}