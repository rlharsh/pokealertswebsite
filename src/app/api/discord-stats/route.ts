import { NextResponse } from "next/server"

const INVITE = process.env.DISCORD_INVITE_CODE ?? "pkmnalerts"

export async function GET() {
	try {
		const r = await fetch(
			`https://discord.com/api/invites/${INVITE}?with_counts=true`,
			{
				next: { revalidate: 60 },
			}
		)

		if (r.status === 429) {
			return NextResponse.json(
				{ memberCount: 0, onlineCount: 0 },
				{
					status: 200,
					headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
				}
			)
		}

		if (!r.ok) {
			return NextResponse.json(
				{ error: `Discord error ${r.status}` },
				{ status: r.status }
			)
		}

		const data = await r.json()

		return NextResponse.json(
			{
				memberCount: data.approximate_member_count ?? 0,
				onlineCount: data.approximate_presence_count ?? 0,
			},
			{ headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" } }
		)
	} catch (e) {
		console.log(e)
		return NextResponse.json(
			{ memberCount: 0, onlineCount: 0 },
			{
				status: 200,
				headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
			}
		)
	}
}
