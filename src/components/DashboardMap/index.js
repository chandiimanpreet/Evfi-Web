import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import { Typography, Box, } from '@mui/material';
import Ratings from '../../components/Rating';
import RoutingMachine from "./RoutingMachine";
import L from 'leaflet';
import { Icon } from 'leaflet'
import NavigationBar from "../NavigationBar";
import FindCurrentLocation from "./FindCurrentLocation";
import { useLocation } from "react-router";

const DashboardMap = ({ searchCoordinates, show, setSearchCoordinates, showRoute, showCurrentLocation, setCurrentLocation, card }) => {

	const location = useLocation();
	// let center = card.coordinates !== undefined ? [card.coordinates.latitude, card.coordinates.longitude] : [29.972101, 76.904388];

	return (
		<div>
			<MapContainer center={[29.972101, 76.904388]} zoom={13} scrollWheelZoom={false} style={{}} >
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{show &&
					<div>
						<Marker position={[searchCoordinates.source.coordinates[1], searchCoordinates.source.coordinates[0]]} icon={new Icon({ iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
						/>
						<Marker position={[searchCoordinates.destination.coordinates[1], searchCoordinates.destination.coordinates[0]]}
							icon={new Icon({ iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
						/>
						<RoutingMachine searchCoordinates={searchCoordinates} />
					</div>
				}
				{
					showCurrentLocation && <FindCurrentLocation />
				}
				{
					card.coordinates !== undefined && (
						<Mark cardDetails={card} />
					)
				}
			</MapContainer>
			{
				location.pathname === '/' &&
				<NavigationBar setSearchCoordinates={setSearchCoordinates}
					searchCoordinates={searchCoordinates}
					showRoute={showRoute}
					setCurrentLocation={setCurrentLocation}
				/>
			}
		</div>
	)
}

const Mark = ({ cardDetails }) => {

	const { name, location, type, rating, img, coordinates } = cardDetails;

	// States
	const map = useMap();
	const markerRef = useRef();

	const markerIcon = new L.icon({
		iconUrl: require("./marker.png"),
		iconSize: [30, 30],
		popupAnchor: [0, -20],
	});

	// Handlers

	useEffect(() => {				// this is used for first time showing the popup automatically	AND this executed only once.
		setTimeout(() => {			// then afterwards 2nd setTimeout will run
			markerRef.current.openPopup();
		}, 1000);
	}, [markerRef]);

	if (coordinates !== undefined) {
		
		map.setView([coordinates.latitude, coordinates.longitude], 13);
		setTimeout(() => {
			map.flyTo([coordinates.latitude, coordinates.longitude], 13, { duration: 2 });
		}, 2000);

		if (markerRef.current !== undefined && markerRef.current.openPopup() === null) {
			setTimeout(() => {
				markerRef.current.openPopup();		// Here
			}, 1000);
		}
	}

	return (
		<Marker position={[coordinates.latitude, coordinates.longitude]} icon={markerIcon} ref={markerRef}>
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
		</Marker>
	);
}

export default DashboardMap;