import { sdk, databases } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  if (!data.lat || !data.lon) {
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

  let distances = [];

  for (let i = 0; i < eventResponse.documents.length; i++) {
    const event = eventResponse.documents[i];
    const distance = calcCrow(
      data.lat,
      data.lon,
      event.coords.split(",")[0],
      event.coords.split(",")[1]
    );
    const days = daysUntilDate(event.date.split(":")[0]);
    distances.push({ id: event.$id, distance, days, i });
  }

  //distances.sort((a, b) => a.distance - b.distance);
  // sort by days and distance, the soonest and closest first, ignore the events that already happened
  distances = distances.filter((event) => event.days >= 0);
  distances.sort((a, b) => a.days - b.days || a.distance - b.distance);
  distances[0].data = eventResponse.documents[distances[0].i];

  //const events = eventResponse.documents.filter(event => event.organizer === user.$id);
  //const events = eventResponse.documents;
  return NextResponse.json(distances);
}

function daysUntilDate(targetDate) {
  var today = new Date();
  var currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  var parts = targetDate.split(".");
  var day = parseInt(parts[0]);
  var month = parseInt(parts[1]);
  var year = parseInt(parts[2]);

  var targetDate = new Date(year, month - 1, day);
  var difference = targetDate.getTime() - currentDate.getTime();
  var daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function toRad(Value) {
  return (Value * Math.PI) / 180;
}
