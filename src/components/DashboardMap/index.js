import React from 'react';
import { Typography, Box, } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap, } from "react-leaflet";
import Ratings from '../../components/Rating';
import L from 'leaflet';
import "./style.css";

const Mark = ({ cardDetails }) => {

	const { name, location, type, rating, img, coordinates } = cardDetails;

	const map = useMap();
	if (coordinates !== undefined) {
		map.flyTo([coordinates.latitude, coordinates.longitude], 13, { duration: 2 });
	}

	const markerIcon = new L.icon({
		iconUrl: require("./marker.png"),
		iconSize: [30, 30],
		popupAnchor: [0, -30],
	});
	return (
		<Marker position={[coordinates.latitude, coordinates.longitude]} icon={markerIcon} >
			<Popup>
				<Box component='img' sx={{ height: 150, width: 300, borderRadius: '15px' }} alt='Charging Station' src={img}></Box>
				<Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242', margin: '0px !important' }}>{name}</Typography>
				<Typography sx={{ fontSize: 13, color: '#797575', margin: '0px !important' }}>{location}</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex' }}>
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Charging Type:{' '}</Typography>
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{type}</Typography>
					</Box>
					<Box sx={{ display: 'flex' }} >
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important', }}>Ratings{' '}</Typography>
						<Ratings rating={rating} />
					</Box>
				</Box>
			</Popup>
		</Marker >
	);
}

const DashboardMap = ({ card }) => {

	let center = card.coordinates !== undefined ? [card.coordinates.latitude, card.coordinates.longitude] : [29.972101, 76.904388];

	return (
		<MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ position: 'relative', paddingRight: '27rem', }} >
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{
				card.coordinates !== undefined && (
					<Mark cardDetails={card} />
				)
			}
		</MapContainer >
	);
};

export default DashboardMap;
