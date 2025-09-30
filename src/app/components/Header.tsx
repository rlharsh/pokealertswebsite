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

	const DrawerList = (
		<Box
			sx={{ width: 300 }}
			className=""
			role="presentation"
			onClick={() => toggleDrawer(false)}
		>
			<List>
				{["Home", "About", "Community", "Testimonials"].map((text, index) => (
					<ListItem key={text}>
						<ListItemButton>
							<ListItemIcon>{icons[index] ?? <InfoOutlined />}</ListItemIcon>
							<ListItemText primary={text} />
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
						<Link href="" className="hover:text-[#FFBB00]">
							Home
						</Link>
						<Link href="" className="hover:text-[#FFBB00]">
							About
						</Link>
						<Link href="" className="hover:text-[#FFBB00]">
							Community
						</Link>
						<Link href="" className="hover:text-[#FFBB00]">
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
