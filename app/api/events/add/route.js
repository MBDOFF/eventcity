import { client, databases, ID, verify } from "@/files/js/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({});
}

export async function POST(req, res) {
    const data = await req.json();
    console.log(data);
  
    if (!data.email || !data.pass || !data.name || !data.date || !data.time || !data.location || !data.city || !data.description || !data.tags || !data.coords || !data.vol || !data.image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
  
    const verified = await verify(data.email, data.pass);
  
    if(!verified.status){
      return NextResponse.json(verified, { status: 400 });
    }
  
    const user = verified.user;
    if(!user.op){
        return NextResponse.json({ error: "You are not an organizer" }, { status: 400 });
    }

    const event = {
        name: data.name,
        date: data.date,
        start: data.time,
        location: data.location,
        city: data.city,
        desc: data.description,
        organizer: user.$id,
        users: JSON.stringify({}),
        tags: data.tags,
        coords: data.coords,
        vol: data.vol,
        image: data.image,
        author: data.author,
    }

    const response = await databases.createDocument(
      "65eba297f2b27e0ab9d0",
      "65eba31400845ba99440",
      ID.unique(),
      event
    );

    return NextResponse.json({ response });
  }
  