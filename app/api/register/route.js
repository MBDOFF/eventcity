const sdk = require("node-appwrite");
const crypto = require("crypto");

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  const { Client, Databases } = sdk;

  let client = new Client();

  client
    .setEndpoint("https://s.codeko.ro/v1")
    .setProject("65eba08af0c0ba865a40")
    .setKey(
      "22465f6eafaa596c17a3a4f02f1bd3181aac81dcfac0dfc3b9d92a8c99d42f9fa26c5c51d0639423fafaa80f696bfd86a77020fbd9bd4a78d27ac2bbc5134010ec5927849c4b5a01fddc6dc321320628cfd909b5e739f80fce1673b666ae1bee1af92f869746f1aacf166194293c9fcca64434b3fd140ad32c5a47f16e2354fd"
    )
    .setSelfSigned();

  const databases = new Databases(client);

  if (!data.email || !data.pass || !data.phone || !data.name) {
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

  const profile = await databases.createDocument(
    "65eba297f2b27e0ab9d0",
    "65eba72d2fab460660a2",
    sdk.ID.unique(),
    {
      email: data.email,
      name: data.name,
      phone: data.phone,
      pass: crypto.createHash("md5").update(data.pass).digest("hex"),
      prefs: JSON.stringify({}),
      socials: JSON.stringify({}),
    }
  );

  return NextResponse.json({ profile });
}
