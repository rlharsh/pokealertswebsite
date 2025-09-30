import React from "react";

const Footer = () => {
	return (
		<footer className="text-white z-10">
			<div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center md:justify-between my-8">
				<p>© {new Date().getFullYear()} Pokemon Restocks & Alerts</p>
				<div>Design by SumoSoft</div>
			</div>
		</footer>
	);
};

export default Footer;
