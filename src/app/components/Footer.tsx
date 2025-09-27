import React from "react";

const Footer = () => {
	return (
		<footer className="text-white z-10">
			<div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center md:justify-between my-8">
				<p>© {new Date().getFullYear()} Pokemon Restocks & Alerts</p>
				<nav className="hidden md:flex gap-4">
					<a className="hover:text-slate-200">About</a>
					<a className="hover:text-slate-200">Community</a>
					<a className="hover:text-slate-200">Testimonials</a>
					<a className="hover:text-slate-200">Privacy</a>
					<a className="hover:text-slate-200">Terms</a>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
