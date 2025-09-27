import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  try {
    const { uid } = await params;
    const userId = uid;

    const r = await fetch(
        `https://discordclientapi.netlify.app/.netlify/functions/avatar/${userId}`
    );

    if (!r.ok) {
        return NextResponse.json(
            { error: `Error getting user information: ${r.statusText}`},
            { status: r.status }
        )
    }
    const data = await r.json();

    return NextResponse.json(
        {
            username: data.username,
            avatarUrl: data.avatarURL,
            bannerUrl: data.bannerURL,
            jsonBody: data,
        }
    )
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
