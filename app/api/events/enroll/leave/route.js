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
    return NextResponse.json(verified, { status: 400 });
  }

  const user = verified.user;

  const eventResponse = await databases.getDocument(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    data.event
  );

  if (!eventResponse) {
    return NextResponse.json({ error: "Event not found" }, { status: 400 });
  }

  const event = eventResponse.document;
  const users = event.users.map((user) => JSON.parse(user)) || [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].user === user.$id) {
      users.splice(i, 1);
      break;
    }
  }

  ///const usersS = users.map((user) => JSON.stringify(user));

  const response = await databases.updateDocument(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    data.event,
    {
      users: users,
    }
  );

  return NextResponse.json({ response });
}
