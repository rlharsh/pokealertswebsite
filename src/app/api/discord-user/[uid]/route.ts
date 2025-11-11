import { NextResponse } from "next/server"

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ uid: string }> }
) {
	try {
		const { uid } = await params
		const userId = uid

		// Use Discord's official API directly instead of external Netlify function
		const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

		if (!DISCORD_BOT_TOKEN) {
			console.error("DISCORD_BOT_TOKEN is not set")
			return NextResponse.json(
				{ error: "Service configuration error" },
				{ status: 500 }
			)
		}

		const r = await fetch(`https://discord.com/api/v10/users/${userId}`, {
			headers: {
				Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
			},
			next: { revalidate: 3600 }, // Cache for 1 hour
		})

		if (!r.ok) {
			return NextResponse.json(
				{ error: `Error getting user information: ${r.statusText}` },
				{ status: r.status }
			)
		}

		const data = await r.json()

		// Construct avatar and banner URLs from Discord CDN
		const avatarUrl = data.avatar
			? `https://cdn.discordapp.com/avatars/${userId}/${data.avatar}.${
					data.avatar.startsWith("a_") ? "gif" : "png"
			  }?size=128`
			: `https://cdn.discordapp.com/embed/avatars/${
					data.discriminator === "0"
						? Number(BigInt(userId) >> BigInt(22)) % 6
						: parseInt(data.discriminator) % 5
			  }.png`

		const bannerUrl = data.banner
			? `https://cdn.discordapp.com/banners/${userId}/${data.banner}.${
					data.banner.startsWith("a_") ? "gif" : "png"
			  }?size=512`
			: null

		return NextResponse.json(
			{
				username: data.username,
				avatarUrl: avatarUrl,
				bannerUrl: bannerUrl,
				jsonBody: data,
			},
			{
				headers: {
					"Cache-Control": "s-maxage=3600, stale-while-revalidate=7200",
				},
			}
		)
	} catch (e) {
		console.error(e)
		return NextResponse.json({ error: "Internal error" }, { status: 500 })
	}
}
