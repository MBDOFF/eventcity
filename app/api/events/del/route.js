import { client, databases, ID, verify } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  if (!data.email || !data.pass || !data.event) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const verified = await verify(data.email, data.pass);

  if (!verified.status) {
    return NextResponse.json({ error: verified.error }, { status: 400 });
  }

  const user = verified.user;
  if (!user.op) {
    return NextResponse.json(
      { error: "You are not an organizer" },
      { status: 400 }
    );
  }

  const eventResponse = await databases.getDocument(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    data.event
  );

  if (!eventResponse) {
    return NextResponse.json({ error: "Event not found" }, { status: 400 });
  }

  const event = eventResponse.document;
  if (event.organizer !== user.$id) {
    return NextResponse.json(
      { error: "You are not the organizer" },
      { status: 400 }
    );
  }

  const response = await databases.deleteDocument(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    data.event
  );

  return NextResponse.json({ response });
}
