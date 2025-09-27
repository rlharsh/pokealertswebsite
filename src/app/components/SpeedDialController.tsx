"use client";

import { InfoOutline, ModeCommentOutlined } from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React from "react";

function SpeedDialController() {
	const [open, setOpen] = React.useState(false);

	type Action = {
		icon: React.ReactElement;
		name: string;
		callback?: (e?: React.MouseEvent) => void;
	};

	const actions: Action[] = [
		{
			icon: <ModeCommentOutlined />,
			name: "Discord",
			callback: () => {
				console.log("Hello world!");
			},
		},
		{
			icon: <InfoOutline />,
			name: "About",
			callback: () => {
				console.log("About us");
			},
		},
	];

	return (
		<div>
			<SpeedDial
				ariaLabel="Test"
				sx={{ position: "absolute", bottom: 32, right: 32 }}
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				icon={<SpeedDialIcon />}
				className="sm:opacity-0"
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						slotProps={{
							tooltip: {
								open: true,
								title: action.name,
							},
						}}
						onClick={(e) => {
							e.stopPropagation();
							action.callback?.(e);
							setOpen(false);
						}}
					/>
				))}
			</SpeedDial>
		</div>
	);
}

export default SpeedDialController;
