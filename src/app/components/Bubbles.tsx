// app/components/Bubbles.tsx
"use client";
import { useEffect, useMemo, useRef } from "react";

export default function Bubbles({ count = 20, className = "" }) {
	const rootRef = useRef<HTMLDivElement>(null);
	const items = useMemo(() => Array.from({ length: count }), [count]);

	useEffect(() => {
		const el = rootRef.current;
		if (!el) return;

		const rand = (min: number, max: number) => Math.random() * (max - min) + min;
		const bubbles = el.querySelectorAll<HTMLElement>(":scope > .bubble");

		bubbles.forEach((b) => {
			// place within the overlay's width
			b.style.setProperty("--bubble-left-offset", `${rand(0, 100)}%`);
			b.style.setProperty("--bubble-radius", `${rand(100, 200)}px`); // size can stay vw for variety
			b.style.setProperty("--bubble-float-duration", `${rand(6, 12)}s`);
			b.style.setProperty("--bubble-sway-duration", `${rand(4, 6)}s`);
			b.style.setProperty("--bubble-float-delay", `${rand(0, 4)}s`);
			b.style.setProperty("--bubble-sway-delay", `${rand(0, 4)}s`);
			b.style.setProperty(
				"--bubble-sway-type",
				Math.random() < 0.5 ? "sway-left-to-right" : "sway-right-to-left"
			);
		});
	}, [count]);

	return (
		<div
			ref={rootRef}
			className={`fixed w-full left-0 top-0 pointer-events-none ${className}`}
			aria-hidden="true"
		>
			{items.map((_, i) => (
				<span key={i} className="bubble" />
			))}
		</div>
	);
}
