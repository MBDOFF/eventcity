import { client, databases, ID } from "@/files/js/db.js";
import { NextResponse } from "next/server";
const crypto = require("crypto");

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  if (!data.email || !data.pass || !data.phone || !data.name || !data.prenume) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const findPromise = await databases.listDocuments(
    "65eba297f2b27e0ab9d0",
    "65eba72d2fab460660a2"
  );

  const user = findPromise.documents.find((user) => user.email === data.email);
  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const tagsPromise = databases.getAttribute(
    "65eba297f2b27e0ab9d0",
    "65eba31400845ba99440",
    "tags"
  );

  const tagsData = (await tagsPromise).elements;
  const tags = tagsData.reduce((acc, tag) => {
    acc[tag] = false;
    return acc;
  }, {});

  const profile = await databases.createDocument(
    "65eba297f2b27e0ab9d0",
    "65eba72d2fab460660a2",
    ID.unique(),
    {
      email: data.email,
      name: data.name,
      prenume: data.prenume,
      phone: data.phone,
      pass: crypto.createHash("md5").update(data.pass).digest("hex"),
      prefs: JSON.stringify({
        tags,
      }),
      vol: JSON.stringify({}),
      socials: JSON.stringify({}),
    }
  );

  return NextResponse.json({ profile });
}
