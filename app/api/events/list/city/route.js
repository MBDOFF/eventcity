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

  function removeDiacritics(str) {
    const diacriticsMap = {
      'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
      'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
    };

    return str.replace(/[ăâîșțĂÂÎȘȚ]/g, match => diacriticsMap[match]);
  }

  const filteredEvents = eventResponse.documents.filter(event => {
    return removeDiacritics(event.city.toLowerCase()) === removeDiacritics(data.city.toLowerCase());
  });

  return NextResponse.json(filteredEvents);
}
