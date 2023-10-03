import { useEffect, useRef, useState, useCallback, Fragment } from 'react';
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import { Typography, Box, Chip, Button } from '@mui/material';
import { CurrencyRupee } from '@mui/icons-material';
import Ratings from '../../components/Rating';
import RoutingMachine from "./RoutingMachine";
import L from 'leaflet';
import SearchBar from "../SearchBar";
import FindCurrentLocation from "./FindCurrentLocation";
import { useLocation } from "react-router";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import * as geofirestore from 'geofirestore';
import firebaseConfig from "../../utils/config/firebaseConfig";
import { requestCharger } from '../../utils/auth/user';
import ChargerPopup from './ChargerPopup';

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const geocollection = GeoFirestore.collection('chargers');

const DashboardMap = ({
	searchCoordinates, show, setShow, setSearchCoordinates, showRoute, showCurrentLocation,
	setCurrentLocation, card, chargers, searchLocationCoordinates, setSearchLocationCoordinates, user }) => {

	console.log(card.charger)

	// Constants
	const location = useLocation();

	// States
	const uselocation = useLocation();
	const [position, setPosition] = useState(null);
	const [currentchargers, setCurrentchargers] = useState(null);
	const [currentLocationChargers, setCurrentLocationChargers] = useState(null);

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
		popupAnchor: [41, -31],
		focus: true,
		draggable: false,
	});

	// Handlers
	const bookingHandler = async (charger) => {
		// if (user.level2.mileage === '') {
		// 	navigate('/register/level2?redirectTo=Home');
		// }
		await requestCharger(charger, user)
	};

	const setcurrentmarker = useCallback(() => {
		setCurrentchargers(null);
		const query = geocollection.near({
			center: new firebase.firestore.GeoPoint(position.lat, position.lng), radius: 100
		});

		query.get().then((value) => {
			setCurrentchargers(value.docs);
			console.log(value.docs);
		});
	}, [position]);

	useEffect(() => {
		console.log(currentLocationChargers)
		console.log(chargers)
	}, [currentLocationChargers, chargers])

	useEffect(() => {
		if (position) {
			setcurrentmarker();
		}
		// Call setcurrentmarker only once when the component mounts
	}, [position, setcurrentmarker]);

	const showSearchLocationChargers = useCallback(() => {

		if (uselocation.pathname === '/' && searchLocationCoordinates.searchlocation.coordinates != null) {
			setCurrentLocationChargers(null);

			const query = geocollection.near({
				center: new firebase.firestore.GeoPoint(
					searchLocationCoordinates.searchlocation.coordinates[1],
					searchLocationCoordinates.searchlocation.coordinates[0]),
				radius: 100
			});

			query.get().then((value) => {
				setCurrentLocationChargers(value.docs);
				console.log(value.docs);
			});
		}
	}, [searchLocationCoordinates, uselocation.pathname]);

	useEffect(() => {
		if (uselocation.pathname === '/' && searchLocationCoordinates.searchlocation.coordinates) {
			showSearchLocationChargers();
		}
		// Call setcurrentmarker only once when the component mounts
	}, [searchLocationCoordinates, showSearchLocationChargers, uselocation.pathname]);

	return (
		<Fragment>
			<MapContainer center={[29.9695, 76.8783]} zoom={13} scrollWheelZoom={true} minZoom={2}
				maxZoom={18} >
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{
					show === false && searchLocationCoordinates.searchlocation.coordinates === null && (
						<div>
							<LocationMarker setPosition={setPosition} position={position} markerIcon={markerIcon} />
							{
								currentchargers && currentchargers.map((charger, index) => {
									return (
										<Marker key={index} icon={greenmarkerIcon} draggable={false}
											position={[charger.data().g.geopoint.latitude, charger.data().g.geopoint.longitude]}>
											<ChargerPopup ele={charger} bookingHandler={bookingHandler} />
										</Marker>
									)
								})
							}
						</div>
					)
				}

				{
					show === false && searchLocationCoordinates.searchlocation.coordinates &&
					<div>
						<SearchLocationMark cardDetails={{ coordinates: { latitude: searchLocationCoordinates.searchlocation.coordinates[1], longitude: searchLocationCoordinates.searchlocation.coordinates[0] } }} />
						{
							currentLocationChargers && currentLocationChargers.map((charger, index) => {
								return (
									<Marker key={index} icon={greenmarkerIcon} draggable={false}
										position={[charger.data().g.geopoint.latitude, charger.data().g.geopoint.longitude]}
									>
										<Popup>
											<Box component='img' sx={{ height: 150, width: 300, borderRadius: '15px' }} alt='Charging Station' src={charger.data().info.imageUrl[0]}></Box>
											<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
												<Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242', margin: '0px !important' }}>{charger.data().info.stationName}</Typography>
												<Chip label="Available" color="success" size="small" variant="contained" />
											</Box>
											<Typography sx={{ fontSize: '12.7px', color: '#797575', marginTop: '4px !important', marginBottom: '2px !important' }}>{charger.data().info.address}</Typography>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px !important' }}>
												<Box sx={{ display: 'flex', }}>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Charging Type:{' '}</Typography>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{charger.data().info.chargerType}</Typography>
												</Box>
												<Box sx={{ display: 'flex' }} >
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important', }}>Ratings{' '}</Typography>
													<Ratings rating={4} />
												</Box>
											</Box>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px !important' }}>
												<Box sx={{ display: 'flex' }}>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Opening Time:  {'   '}</Typography>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>9:00 AM</Typography>
												</Box>
												<Box sx={{ display: 'flex' }} >
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Closing Time:  {'   '}</Typography>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold', }}>8:00 PM</Typography>
												</Box>
											</Box>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', }}>

												<Box sx={{ display: 'flex' }} >
													<CurrencyRupee sx={{ height: '15px', width: '15px', marginTop: '4px', }} />
													<Typography sx={{ fontSize: 16, margin: '0px !important', fontWeight: 'bold' }}>
														{charger.data().info.price}
													</Typography>
												</Box>
												<Box sx={{ display: 'flex' }}>
													<Button onClick={() => { bookingHandler(charger); }} variant="contained" sx={{
														backgroundColor: '#FCDD13', color: '#292929', fontSize: '11px', fontFamily: 'Manrope !important',
														textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', padding: '0px 10px',
													}}>Book Now</Button>
												</Box>
											</Box>
										</Popup>
									</Marker>
								)
							})
						}
					</div>
				}

				{show && searchCoordinates.source.coordinates && searchCoordinates.destination.coordinates &&
					<div>
						<Marker position={[searchCoordinates.source.coordinates[1], searchCoordinates.source.coordinates[0]]} icon={markerIcon} draggable={false}>
						</Marker>

						<Marker position={[searchCoordinates.destination.coordinates[1], searchCoordinates.destination.coordinates[0]]} icon={markerIcon} draggable={false}>
						</Marker>

						{
							chargers && chargers.map((charger, index) => {
								return (
									<Marker key={index} icon={greenmarkerIcon} draggable={false}
										position={[charger.data().g.geopoint.latitude, charger.data().g.geopoint.longitude]} >
										<Popup>
											<Box component='img' sx={{ height: 150, width: 300, borderRadius: '15px' }} alt='Charging Station' src={charger.data().info.imageUrl[0]}></Box>
											<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
												<Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242', margin: '0px !important' }}>{charger.data().info.stationName}</Typography>
												<Chip label="Available" color="success" size="small" variant="contained" />
											</Box>
											<Typography sx={{ fontSize: '12.7px', color: '#797575', marginTop: '4px !important', marginBottom: '2px !important' }}>{charger.data().info.address}</Typography>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px !important' }}>
												<Box sx={{ display: 'flex', }}>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Charging Type:{' '}</Typography>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{charger.data().info.chargerType}</Typography>
												</Box>
												<Box sx={{ display: 'flex' }} >
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important', }}>Ratings{' '}</Typography>
													<Ratings rating={4} />
												</Box>
											</Box>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px !important' }}>
												<Box sx={{ display: 'flex' }}>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Opening Time:  {'   '}</Typography>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>9:00 AM</Typography>
												</Box>
												<Box sx={{ display: 'flex' }} >
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Closing Time:  {'   '}</Typography>
													<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold', }}>8:00 PM</Typography>
												</Box>
											</Box>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', }}>

												<Box sx={{ display: 'flex' }} >
													<CurrencyRupee sx={{ height: '15px', width: '15px', marginTop: '4px', }} />
													<Typography sx={{ fontSize: 16, margin: '0px !important', fontWeight: 'bold' }}>
														{charger.data().info.price}
													</Typography>
												</Box>
												<Box sx={{ display: 'flex' }}>
													<Button onClick={() => { bookingHandler(charger); }} variant="contained" sx={{
														backgroundColor: '#FCDD13', color: '#292929', fontSize: '11px', fontFamily: 'Manrope !important',
														textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', padding: '0px 10px',
													}}>Book Now</Button>
												</Box>
											</Box>
										</Popup>
									</Marker>
								)
							})
						}

						<RoutingMachine searchCoordinates={searchCoordinates} key={searchCoordinates.source.label + searchCoordinates.destination.label} />
					</div>
				}
				{
					showCurrentLocation &&
					<FindCurrentLocation setSearchCoordinates={setSearchCoordinates}
						searchCoordinates={searchCoordinates}
					/>
				}
				{
					card.charger?.g && card.charger?.g && (
						<Mark cardDetails={card.charger} />
					)
				}
			</MapContainer >
			{
				location.pathname === '/' &&
				<SearchBar
					setSearchCoordinates={setSearchCoordinates}
					searchCoordinates={searchCoordinates}
					showRoute={showRoute}
					setCurrentLocation={setCurrentLocation}
					searchLocationCoordinates={searchLocationCoordinates}
					setSearchLocationCoordinates={setSearchLocationCoordinates}
					setShow={setShow}
				/>
			}
		</Fragment>
	)
}

const Mark = ({ cardDetails }) => {

	console.log(cardDetails)

	const latitude = cardDetails?.g.geopoint.latitude;
	const longitude = cardDetails?.g.geopoint.longitude;

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
		if (latitude !== undefined && longitude !== undefined) {
			markerRef.current.openPopup();
			map.flyTo(
				[latitude, longitude],
				13,
				{ duration: 1 }
			);
		}
	}, [map, latitude, longitude]);

	return (
		<Marker icon={markerIcon} draggable={false}
			position={[cardDetails.g.geopoint.latitude, cardDetails.g.geopoint.longitude]} ref={markerRef}>
			<Popup>
				<Box component='img' sx={{ height: 150, width: 300, borderRadius: '15px' }} alt='Charging Station' src={cardDetails.info.imageUrl[0]}></Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#454242', margin: '0px !important' }}>{cardDetails.info.stationName}</Typography>
					<Chip label="Available" color="success" size="small" variant="contained" />
				</Box>
				<Typography sx={{ fontSize: '12.7px', color: '#797575', marginTop: '4px !important', marginBottom: '2px !important' }}>{cardDetails.info.address}</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px !important' }}>
					<Box sx={{ display: 'flex', }}>
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Charging Type:{' '}</Typography>
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>{cardDetails.info.chargerType}</Typography>
					</Box>
					<Box sx={{ display: 'flex' }} >
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important', }}>Ratings{' '}</Typography>
						<Ratings rating={4} />
					</Box>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px !important' }}>
					<Box sx={{ display: 'flex' }}>
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Opening Time:  {'   '}</Typography>
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold' }}>9:00 AM</Typography>
					</Box>
					<Box sx={{ display: 'flex' }} >
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important' }}>Closing Time:  {'   '}</Typography>
						<Typography sx={{ fontSize: '.75rem', margin: '0px !important', fontWeight: 'bold', }}>8:00 PM</Typography>
					</Box>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', }}>

					<Box sx={{ display: 'flex' }} >
						<CurrencyRupee sx={{ height: '15px', width: '15px', marginTop: '4px', }} />
						<Typography sx={{ fontSize: 16, margin: '0px !important', fontWeight: 'bold' }}>
							{cardDetails.info.price}
						</Typography>
					</Box>
					<Box sx={{ display: 'flex' }}>
						<Button variant="contained" sx={{
							backgroundColor: '#FCDD13', color: '#292929', fontSize: '11px', fontFamily: 'Manrope !important',
							textTransform: 'capitalize', fontWeight: 'bold', borderRadius: '10px', padding: '0px 10px',
						}}>Book Now</Button>
					</Box>
				</Box>
			</Popup>
		</Marker>
	);
}

const SearchLocationMark = ({ cardDetails }) => {
	const { coordinates } = cardDetails;

	// States
	const map = useMap();
	const markerRef = useRef(null);
	const markerIcon = new L.icon({
		iconUrl: require("./locationmarker.png"),
		iconSize: [25, 41],
		iconAnchor: [12, 41],
	});
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