import { client, databases, ID, verify } from "../../../../files/js/db.js";
import { NextResponse } from "next/server";
const crypto = require("crypto");

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  if (!data.email || !data.pass || !data.type) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const verified = await verify(data.email, data.pass);

  if (!verified.status) {
    return NextResponse.json({ verified }, { status: 400 });
  }

  const user = verified.user;

  if (data.type === "fb") {
    /*if (!data.value)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );*/

    user.socials = JSON.parse(user.socials);
    user.socials.fb = data.value;

    const response = await databases.updateDocument(
      "65eba297f2b27e0ab9d0",
      "65eba72d2fab460660a2",
      user.$id,
      {
        socials: JSON.stringify(user.socials),
      }
    );

    return NextResponse.json({ response });
  } else if (data.type === "ig") {
    /*if (!data.value)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );*/

    user.socials = JSON.parse(user.socials);
    user.socials.ig = data.value;

    const response = await databases.updateDocument(
      "65eba297f2b27e0ab9d0",
      "65eba72d2fab460660a2",
      user.$id,
      {
        socials: JSON.stringify(user.socials),
      }
    );

    return NextResponse.json({ response });
  } else if (data.type === "prefs") {
    if (!data.value)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    const response = await databases.updateDocument(
      "65eba297f2b27e0ab9d0",
      "65eba72d2fab460660a2",
      user.$id,
      {
        prefs: JSON.stringify(data.value),
      }
    );

    return NextResponse.json({ response });
  } else if (data.type === "vol") {
    if (!data.value)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    const response = await databases.updateDocument(
      "65eba297f2b27e0ab9d0",
      "65eba72d2fab460660a2",
      user.$id,
      {
        vol: JSON.stringify(data.value),
      }
    );

    return NextResponse.json({ response });
  } else if (data.type === "tel") {
    if (!data.value)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    const response = await databases.updateDocument(
      "65eba297f2b27e0ab9d0",
      "65eba72d2fab460660a2",
      user.$id,
      {
        phone: data.value,
      }
    );

    return NextResponse.json({ response });
  }else if (data.type === "pass") {
    if (!data.value)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    const response = await databases.updateDocument(
      "65eba297f2b27e0ab9d0",
      "65eba72d2fab460660a2",
      user.$id,
      {
        pass: crypto.createHash("md5").update(data.value).digest("hex"),
      }
    );

    return NextResponse.json({ response });
  }
}
