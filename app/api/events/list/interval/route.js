import { sdk, databases, daysUntilDate, calcCrow } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  if (!data.date || !data.date2) {
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

  var _parts = data.date.split(".");
  var _day = parseInt(_parts[0]);
  var _month = parseInt(_parts[1]);
  var _year = parseInt(_parts[2]);
  var _targetDate = new Date(_year, _month - 1, _day);

  var _parts2 = data.date2.split(".");
  var _day2 = parseInt(_parts2[0]);
  var _month2 = parseInt(_parts2[1]);
  var _year2 = parseInt(_parts2[2]);
  var _targetDate2 = new Date(_year2, _month2 - 1, _day2);


  for (let i = 0; i < eventResponse.documents.length; i++) {
    const event = eventResponse.documents[i];
    const interval = event.date.split(":");

    var parts1 = interval[0].split(".");
    var day1 = parseInt(parts1[0]);
    var month1 = parseInt(parts1[1]);
    var year1 = parseInt(parts1[2]);
    var targetDate1 = new Date(year1, month1 - 1, day1);

    const isMulti = interval[1] !== "undefined";
    var targetDate2 = undefined;
    if (isMulti) {
      var parts2 = interval[1].split(".");
      var day2 = parseInt(parts2[0]);
      var month2 = parseInt(parts2[1]);
      var year2 = parseInt(parts2[2]);
      targetDate2 = new Date(year2, month2 - 1, day2);
    }
    if (_targetDate > targetDate2 || _targetDate2 < targetDate1) {
      eventResponse.documents.splice(i, 1);
      i--;
      continue;
    }

  }

  return NextResponse.json(eventResponse.documents);
}
