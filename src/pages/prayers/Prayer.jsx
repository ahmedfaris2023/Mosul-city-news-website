import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard({ name, time, image }) {
	return (
		
		<Card sx={{ width: "90%" }}>
			<CardMedia
				sx={{ height: 140 }}
				image={image}
				title="green iguana"
			/>
			<CardContent>
				<h2 className="text-[20px] font-bold font-sans">{name}</h2>

				<Typography variant="h1" color="text.secondary">
					{time}
				</Typography>
			</CardContent>
		</Card>
		
	);
}