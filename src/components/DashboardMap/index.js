import { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import { Typography, Box, } from '@mui/material';
import Ratings from '../../components/Rating';
import RoutingMachine from "./RoutingMachine";
import L from 'leaflet';
import NavigationBar from "../NavigationBar";
import FindCurrentLocation from "./FindCurrentLocation";
import { useLocation } from "react-router";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import * as geofirestore from 'geofirestore';
import firebaseConfig from "../../utils/config/firebaseConfig";
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const geocollection = GeoFirestore.collection('chargers');

const DashboardMap = ({ searchCoordinates, show, setSearchCoordinates, showRoute, showCurrentLocation, setCurrentLocation, card, chargers }) => {
	const [position, setPosition] = useState(null);
	console.log(chargers);
	const [currentchargers, setCurrentchargers] = useState(null);
	console.log(position);
	const markerIcon = new L.icon({
		iconUrl: require("./locationmarker.png"),
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		focus: true,
		draggable: false,
	});
	const greenmarkerIcon = new L.icon({
		iconUrl: require("./GreenMarker.png"),
		iconSize: [100, 100],
		iconAnchor: [12, 41],
		focus: true,
		draggable: false,
	});

	const setcurrentmarker = useCallback(() => {
		setCurrentchargers(null);
		const query = geocollection.near({ center: new firebase.firestore.GeoPoint(position.lat, position.lng), radius: 1000 });

		query.get().then((value) => {
			setCurrentchargers(value.docs);
			console.log(value.docs);
		});

	}, [position]);
	console.log(currentchargers)

	useEffect(() => {
		if (position) {
			setcurrentmarker();
		}
		// Call setcurrentmarker only once when the component mounts
	}, [position, setcurrentmarker]);
	const location = useLocation();

	return (
		<>
			<MapContainer center={[29.9695, 76.8783]}
				zoom={13} scrollWheelZoom={false} minZoom={2}
				maxZoom={18} >
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{
					show === false && <div>
						<LocationMarker setPosition={setPosition} position={position} markerIcon={markerIcon} />
						{
							currentchargers && currentchargers.map((ele, index) => {
								return <Marker
									key={index}
									position={[
										ele.data().g.geopoint.latitude,
										ele.data().g.geopoint.longitude
									]} icon={greenmarkerIcon} draggable={false}
								>
								</Marker>
							})
						}
					</div>
				}


				{show &&
					<div>
						<Marker position={[searchCoordinates.source.coordinates[1], searchCoordinates.source.coordinates[0]]} icon={markerIcon} draggable={false}>
						</Marker>

						<Marker position={[searchCoordinates.destination.coordinates[1], searchCoordinates.destination.coordinates[0]]} icon={markerIcon} draggable={false}>
						</Marker>

						{
							chargers && chargers.map((ele, index) => {
								return <Marker
									key={index}
									position={[
										ele.data().g.geopoint.latitude,
										ele.data().g.geopoint.longitude
									]} icon={greenmarkerIcon} draggable={false}></Marker>
							})
						}

						<RoutingMachine searchCoordinates={searchCoordinates} key={searchCoordinates.source.label + searchCoordinates.destination.label} />
					</div>
				}
				{
					showCurrentLocation &&
					<FindCurrentLocation
						setSearchCoordinates={setSearchCoordinates}
						searchCoordinates={searchCoordinates}
					/>
				}
				{
					card.coordinates !== undefined && (
						<Mark cardDetails={card} />
					)
				}
			</MapContainer>
			{
				location.pathname === '/' &&
				<NavigationBar
					setSearchCoordinates={setSearchCoordinates}
					searchCoordinates={searchCoordinates}
					showRoute={showRoute}
					setCurrentLocation={setCurrentLocation}
				/>
			}
		</>
	)
}

const Mark = ({ cardDetails }) => {
	const { name, location, type, rating, img, coordinates } = cardDetails;

	// States
	const map = useMap();
	const markerRef = useRef(null);
	const markerIcon = new L.icon({
		iconUrl: require("./marker.png"),
		iconSize: [30, 30],
		popupAnchor: [0, -20],
	});

	// Handlers

	useEffect(() => {
		if (markerRef.current) {
			markerRef.current.openPopup();
		}
	}, [markerRef]);


	useEffect(() => {
		if (coordinates !== undefined) {
			map.flyTo(
				[coordinates.latitude, coordinates.longitude],
				13,
				{ duration: 1 }
			);
		}
	}, [map, coordinates]);

	if (!coordinates) {
		return null; // Handle case when coordinates are undefined
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
const LocationMarker = ({ setPosition, position, markerIcon }) => {

	const map = useMap();

	useEffect(() => {
		map.locate().on("locationfound", function (e) {
			setPosition(e.latlng);

			map.flyTo(e.latlng, map.getZoom());
		});

		map.on('locationerror', handleOnLocationError);
		function handleOnLocationError(error) {
			alert(`Unable to determine location: ${error.message}`);
		}
	}, [map, setPosition]);


	return position === null ? null : (
		<Marker position={position} icon={markerIcon}></Marker>
	);
}



export default DashboardMap;