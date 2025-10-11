"use client";

import {
	HomeOutlined,
	InfoOutlined,
	MenuOutlined,
	PeopleOutline,
	RateReviewOutlined,
} from "@mui/icons-material";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (newOpen: boolean) => {
		setDrawerOpen(newOpen);
	};

	const icons = [
		<HomeOutlined key="home" className="text-[#FFBB00]" />,
		<InfoOutlined key="about" className="text-[#FFBB00]" />,
		<PeopleOutline key="community" className="text-[#FFBB00]" />,
		<RateReviewOutlined key="testimonials" className="text-[#FFBB00]" />,
	];

	const menuItems = [
		{ text: "Home", href: "#home" },
		{ text: "About", href: "#about" },
		{ text: "Community", href: "https://discord.gg/pokealerts" },
		{ text: "Testimonials", href: "#testimonials" },
	];

	const handleDrawerLinkClick = (href: string) => {
		if (href.startsWith("#")) {
			setTimeout(() => toggleDrawer(false), 300);
		} else {
			toggleDrawer(false);
		}
	};

	const DrawerList = (
		<Box sx={{ width: 300 }} className="" role="presentation">
			<List>
				{menuItems.map((item, index) => (
					<ListItem key={item.text}>
						<ListItemButton
							component={Link}
							href={item.href}
							target={item.text === "Community" ? "_blank" : undefined}
							rel={item.text === "Community" ? "noopener noreferrer" : undefined}
							onClick={() => handleDrawerLinkClick(item.href)}
						>
							<ListItemIcon>{icons[index] ?? <InfoOutlined />}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<header className="z-10 py-2 px-4 text-white w-full rounded-full flex justify-between items-center">
			<div className="flex justify-center items-center space-x-2">
				<Image
					src="/assets/pokeball.svg"
					alt="Logo"
					width={36}
					height={36}
					className="h-9 w-9 animate-bounce"
				/>
				<h1 className="hidden sm:block text-[#FFBB00] font-bold text-2xl">
					Pokemon Restocks & Alerts
				</h1>
			</div>
			<div>
				<div className="lg:hidden hover:text-[#FFBB00]">
					<MenuOutlined onClick={() => toggleDrawer(true)} />
				</div>
				<div className="hidden lg:block">
					<nav className="flex justify-center items-center space-x-8">
						<Link href="#home" className="hover:text-[#FFBB00]">
							Home
						</Link>
						<Link href="#about" className="hover:text-[#FFBB00]">
							About
						</Link>
						<Link
							href="https://discord.gg/pkmnalerts"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-[#FFBB00]"
						>
							Community
						</Link>
						<Link href="#testimonials" className="hover:text-[#FFBB00]">
							Testimonials
						</Link>
					</nav>
				</div>
			</div>
			<Drawer
				open={drawerOpen}
				onClose={() => toggleDrawer(false)}
				PaperProps={{
					sx: {
						backgroundColor: "var(--background)",
						color: "#fff",
					},
				}}
			>
				{DrawerList}
			</Drawer>
		</header>
	);
};

export default Header;
