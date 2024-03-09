import { client, databases, ID, verify } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  const tagsPromise = databases.getAttribute(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    "tags"
  );

  return NextResponse.json((await tagsPromise).elements);
}
