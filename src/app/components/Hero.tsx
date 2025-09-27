// app/components/Hero.tsx
"use client";

import { Chip, Divider, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type DiscordStats = {
	memberCount: number;
	onlineCount: number;
};

const nf = new Intl.NumberFormat();

export default function Hero() {
	const [stats, setStats] = React.useState<DiscordStats | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		let mounted = true;
		const controller = new AbortController();

		async function load() {
			try {
				setError(null);
				const res = await fetch("/api/discord-stats", {
					signal: controller.signal,
				});
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`);
				}
				const data = (await res.json()) as DiscordStats;
				if (mounted) setStats(data);
			} catch (e: unknown) {
				if (mounted && !isAbortError(e)) {
					setError("Could not load Discord stats.");
				}
			} finally {
				if (mounted) setLoading(false);
			}
		}

		load();
		const id = setInterval(load, 60_000);
		return () => {
			mounted = false;
			controller.abort();
			clearInterval(id);
		};
	}, []);

	return (
		<div className="relative w-full min-h-full z-10">
			<div className="w-full relative rounded-2xl overflow-hidden"></div>
			<div className="relative w-full md:min-h-[24vh] md:max-h-[36vh] mt-4 text-white rounded-lg overflow-hidden ">
				<div className="absolute inset-0 overflow-hidden">
					<Image
						src="/assets/hero.jpg"
						alt=""
						fill
						priority
						sizes="100vw"
						className="
      object-cover
      will-change-transform
      motion-safe:animate-kenburns
      [transform-origin:60%_40%]
    "
					/>

					{/* gradient overlay */}
					<div
						className="
      absolute inset-0 pointer-events-none
      bg-gradient-to-r
      from-black/80 via-black/60 to-transparent
      sm:from-black/80 sm:via-black/55 sm:to-transparent
      lg:from-black/100 lg:via-black/35 lg:to-transparent
    "
					/>
				</div>

				<div className="md:w-full relative z-10 md:relative md:h-full md:left-0 h-full p-4 flex flex-col gap-4 justify-center items-center md:items-start">
					<div className="flex items-center gap-2">
						<h2 className="text-[#FFBB00] font-bold text-xl lg:text-3xl">
							Pokemon Restocks & Alerts
						</h2>
					</div>

					<div className="flex flex-col gap-2 w-[98%] lg:w-[50%]">
						<h3 className="font-bold text-2xl lg:text-xl">
							Never Miss a Restock Again
						</h3>
						<p className="leading-relaxed">
							We find drops fast and ping members instantly. 100% free. No spam—just
							what you need.
						</p>
					</div>

					<Stack
						direction="row"
						spacing={1.5}
						divider={
							<Divider
								orientation="vertical"
								flexItem
								sx={{ borderColor: "rgba(255,187,0,0.8)" }}
							/>
						}
					>
						<Chip
							label={`${loading ? "—" : nf.format(stats?.onlineCount ?? 0)} Online`}
							variant="outlined"
							sx={{
								color: "#FFBB00",
								borderColor: "rgba(255,187,0,0.8)",
								bgcolor: "rgba(255,187,0,0.12)",
								fontSize: "1rem", // ~Tailwind text-2xl vibe
								fontWeight: 600,
								px: 1.25,
								py: 0.75,
								"& .MuiChip-label": { px: 0 }, // tighter label padding
							}}
						/>

						<Chip
							label={`${loading ? "—" : nf.format(stats?.memberCount ?? 0)} Members`}
							variant="outlined"
							sx={{
								color: "#FFBB00",
								borderColor: "rgba(255,187,0,0.8)",
								bgcolor: "rgba(255,187,0,0.12)",
								fontSize: "1rem",
								fontWeight: 600,
								px: 1.25,
								py: 0.75,
								"& .MuiChip-label": { px: 0 },
							}}
						/>
					</Stack>

					{error && (
						<p className="text-sm text-red-300" role="status">
							{error}
						</p>
					)}

					<Link
						href="https://discord.gg/pkmnalerts"
						className="bg-[#FFBB00] hover:bg-[#ffd666] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFBB00] focus-visible:ring-offset-black p-2 rounded-lg md:w-84 text-[#272222] font-bold w-full text-center transition"
						aria-label="Join our Discord server"
						rel="noopener noreferrer"
						target="_blank"
					>
						Join
					</Link>
				</div>
			</div>
			<div
				className="mt-4 w-full relative rounded-2xl overflow-hidden
                  ring-1 ring-white/8
                  shadow-[0_35px_120px_-25px_rgba(0,0,0,0.7)]"
			></div>
		</div>
	);
}

function isAbortError(e: unknown): e is DOMException | Error {
	return (
		(e instanceof DOMException && e.name === "AbortError") ||
		(e instanceof Error && e.name === "AbortError")
	);
}
