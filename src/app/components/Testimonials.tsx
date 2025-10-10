// app/components/Testimonials.tsx
"use client";

import { Document } from "@contentful/rich-text-types";
import React from "react";
import TestimonialCard from "./TestimonialCard";

type ContentfulData = {
	contentCount: number;
	content: {
		userId: string;
		timestamp: string;
		messageContent: {
			json: Document;
		};
		userAvatar: string;
		userName: string;
	}[];
	status: number;
};

const Testimonials = () => {
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const [contentfulData, setContentfulData] = React.useState<ContentfulData | null>(
		null
	);

	React.useEffect(() => {
		let mounted = true;
		const controller = new AbortController();

		async function load() {
			try {
				setError(null);
				const res = await fetch("/api/contentful-get-testimonials", {
					signal: controller.signal,
				});
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`);
				}
				const data = (await res.json()) as ContentfulData;

				if (mounted) {
					const testimonials = [...data.content];
					for (let i = testimonials.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[testimonials[i], testimonials[j]] = [testimonials[j], testimonials[i]];
					}
					const randomTestimonials = testimonials.slice(0, 3);
					setContentfulData({
						...data,
						content: randomTestimonials,
					});
				}
			} catch (e: unknown) {
				if (mounted && !isAbortError(e)) {
					setError("Could not load user information.");
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
	}, []);

	return (
		<div id="testimonials" className="my-8">
			<h2 className="font-bold text-2xl text-[#FFBB00]">Testimonials</h2>
			<p className="text-white">
				Don&apos;t just take our word for it, see what our members are saying about
				their wins.
			</p>
			<div className="w-full mt-4 testimonials-container text-white flex flex-col gap-4">
				{loading && <p>Loading testimonials...</p>}
				{error && <p className="error">{error}</p>}
				{contentfulData &&
					contentfulData.content.length > 0 &&
					contentfulData.content.map((testimonial, index) => (
						<TestimonialCard key={index} testimonial={testimonial} />
					))}
				{contentfulData && contentfulData.content.length === 0 && !loading && (
					<p>No testimonials found.</p>
				)}
			</div>
		</div>
	);
};

export default Testimonials;

function isAbortError(e: unknown): e is DOMException | Error {
	return (
		(e instanceof DOMException && e.name === "AbortError") ||
		(e instanceof Error && e.name === "AbortError")
	);
}
