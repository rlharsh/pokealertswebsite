"use client";

import { Avatar } from "@mui/material";
import React from "react";

type DiscordUser = {
	username: string;
	avatarUrl: string;
	bannerurl: string;
	jsonBody: string;
};

const DiscordAvatar = ({ userId }: { userId: string }) => {
	const [loading, setLoading] = React.useState(true);
	const [userData, setUserData] = React.useState<DiscordUser | null>(null);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		let mounted = true;
		const controller = new AbortController();

		async function load() {
			try {
				setError(null);
				const res = await fetch(`/api/discord-user/${userId}`, {
					signal: controller.signal,
				});
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`);
				}
				const data = (await res.json()) as DiscordUser;
				if (mounted) {
					setUserData(data);
				}
			} catch (e) {
				if (mounted && !isAbortError(e)) {
					setError("Could not get user image.");
				}
			} finally {
				if (mounted) setLoading(false);
			}
		}
		load();
		return () => {
			mounted = false;
			controller.abort();
		};
	}, [userId]);

	return (
		<>{!loading && !error && userData && <Avatar alt="" src={userData.avatarUrl} />}</>
	);
};

export default DiscordAvatar;

function isAbortError(e: unknown): e is DOMException | Error {
	return (
		(e instanceof DOMException && e.name === "AbortError") ||
		(e instanceof Error && e.name === "AbortError")
	);
}
