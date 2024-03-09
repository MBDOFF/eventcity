import { client, databases, ID, verify } from "../../../../../files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  const listPromise = await databases.listDocuments(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440"
  );

  return NextResponse.json(listPromise.documents);
}

/*export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  if (!data.email || !data.pass) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const verified = await verify(data.email, data.pass);

  if(!verified.status){
    return NextResponse.json({ error: verified.error }, { status: 400 });
  }

  const user = verified.user;
  return NextResponse.json({ user });
}
*/
