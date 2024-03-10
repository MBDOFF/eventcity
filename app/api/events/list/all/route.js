import { databases, sdk, daysUntilDate } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  const listPromise = await databases.listDocuments(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    [sdk.Query.limit(5000)]
  );

  listPromise.documents.sort((a, b) => {
    const dateA = a.date.split(":")[0];
    const dateB = b.date.split(":")[0];
    return daysUntilDate(dateA) - daysUntilDate(dateB);
  });

  return NextResponse.json(listPromise.documents);
}
