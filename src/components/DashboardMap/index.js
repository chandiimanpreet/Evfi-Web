import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";
import L from "leaflet";
import SearchBar from "../SearchBar";
import FindCurrentLocation from "./FindCurrentLocation";
import { useLocation } from "react-router";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import * as geofirestore from "geofirestore";
import firebaseConfig from "../../utils/config/firebaseConfig";
import { requestCharger } from "../../utils/auth/user";
import ChargerPopup from "./ChargerPopup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box } from "@mui/material";
import { clearChargers, setChargers } from "../../actions";
import { connect } from "react-redux";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const geocollection = GeoFirestore.collection("chargers");

const DashboardMap = ({
	collectCardData,
	searchCoordinates,
	show,
	setShow,
	setSearchCoordinates,
	showRoute,
	showCurrentLocation,
	setCurrentLocation,
	card,
	searchLocationCoordinates,
	setSearchLocationCoordinates,
	chargers,
	setCharger,
	uniqueChargersID,
	clearCharger,
	userData
}) => {
	// Constants
	const location = useLocation();

	// States
	const uselocation = useLocation();
	const [position, setPosition] = useState(null);

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
	function handleBackButton() {
		collectCardData("");
	}

	const bookingHandler = async (time, AMPM, charger) => {
		try {
			await requestCharger(charger, parseInt(time), AMPM);
		} catch (err) {
			console.log(err);
		}
	};

	const setcurrentmarker = useCallback(() => {
		clearCharger();
		const query = geocollection.near({
			center: new firebase.firestore.GeoPoint(position.lat, position.lng),
			radius: 100,
		});

		query.get().then((value) => {
			value.docs.map((charger) => charger.data()).map((charger) => setCharger(charger));
		});
	}, [position, setCharger, clearCharger]);

	useEffect(() => {
		if (position) {
			setcurrentmarker();
		}
		// Call setcurrentmarker only once when the component mounts
	}, [position, setcurrentmarker]);

	const showSearchLocationChargers = useCallback(() => {
		if (
			uselocation.pathname === "/" &&
			searchLocationCoordinates.searchlocation.coordinates != null
		) {
			clearCharger();
			const query = geocollection.near({
				center: new firebase.firestore.GeoPoint(
					searchLocationCoordinates.searchlocation.coordinates[1],
					searchLocationCoordinates.searchlocation.coordinates[0]
				),
				radius: 100,
			});

			query.get().then((value) => {
				value.docs.map((charger) => charger.data()).map((charger) => setCharger(charger));
			});
		}
	}, [searchLocationCoordinates, uselocation.pathname, setCharger, clearCharger]);

	useEffect(() => {
		if (
			uselocation.pathname === "/" &&
			searchLocationCoordinates.searchlocation.coordinates
		) {
			showSearchLocationChargers();
		}
		// Call setcurrentmarker only once when the component mounts
	}, [
		searchLocationCoordinates,
		showSearchLocationChargers,
		uselocation.pathname,
	]);

	console.log(chargers);

	return (
		<Fragment>
			<MapContainer
				center={[29.9695, 76.8783]}
				zoom={13}
				scrollWheelZoom={true}
				minZoom={2}
				maxZoom={18}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{/* Current Chargers */}
				{show === false &&
					searchLocationCoordinates.searchlocation.coordinates === null && (
						<div>
							<LocationMarker
								setPosition={setPosition}
								position={position}
								markerIcon={markerIcon}
							/>
							{chargers && chargers.map((charger, index) => {
								return (
									<Marker key={index} icon={greenmarkerIcon} draggable={false}
										position={[charger.g.geopoint.latitude, charger.g.geopoint.longitude,]}
									>
										<ChargerPopup
											chargerData={charger}
											bookingHandler={bookingHandler}
											userData={userData}
										/>
									</Marker>
								);
							})}
						</div>
					)}

				{/*Current Location Chargers */}
				{show === false &&
					searchLocationCoordinates.searchlocation.coordinates && (
						<div>
							<SearchLocationMark
								cardDetails={{
									coordinates: {
										latitude:
											searchLocationCoordinates.searchlocation.coordinates[1],
										longitude:
											searchLocationCoordinates.searchlocation.coordinates[0],
									},
								}}
							/>
							{chargers &&
								chargers.map((charger, index) => {
									return (
										<Marker
											key={index}
											icon={greenmarkerIcon}
											draggable={false}
											position={[
												charger?.g?.geopoint.latitude,
												charger?.g?.geopoint.longitude,
											]}
										>
											<ChargerPopup
												chargerData={charger}
												bookingHandler={bookingHandler}
											/>
										</Marker>
									);
								})}
						</div>
					)}

				{show &&
					searchCoordinates.source.coordinates &&
					searchCoordinates.destination.coordinates && (
						<div>
							<Marker
								position={[
									searchCoordinates.source.coordinates[1],
									searchCoordinates.source.coordinates[0],
								]}
								icon={markerIcon}
								draggable={false}
							></Marker>

							<Marker
								position={[
									searchCoordinates.destination.coordinates[1],
									searchCoordinates.destination.coordinates[0],
								]}
								icon={markerIcon}
								draggable={false}
							></Marker>

							{chargers &&
								chargers.map((charger, index) => {
									return (
										<Marker
											key={index}
											icon={greenmarkerIcon}
											draggable={false}
											position={[
												charger?.g?.geopoint.latitude,
												charger?.g?.geopoint.longitude,
											]}
										>
											<ChargerPopup
												chargerData={charger}
												bookingHandler={bookingHandler}
											/>
										</Marker>
									);
								})}

							<RoutingMachine
								searchCoordinates={searchCoordinates}
								key={
									searchCoordinates.source.label +
									searchCoordinates.destination.label
								}
							/>
						</div>
					)}
				{showCurrentLocation && (
					<FindCurrentLocation
						setSearchCoordinates={setSearchCoordinates}
						searchCoordinates={searchCoordinates}
					/>
				)}
				{card.chargerData?.g && card.chargerData?.g && (
					<Mark
						cardDetails={card.chargerData}
						bookingHandler={bookingHandler}
					/>
				)}
				<Box
					style={{
						position: "absolute",
						left: "10px",
						bottom: "10%",
						cursor: "pointer",
						zIndex: 1000,
					}}
				>
					{card && location.pathname === "/previousBooking" && (
						<ArrowBackRoundedIcon
							onClick={handleBackButton}
							sx={{ display: { xs: "flex", md: "none" } }}
						/>
					)}
				</Box>
			</MapContainer>
			{location.pathname === "/" && (
				<SearchBar
					setSearchCoordinates={setSearchCoordinates}
					searchCoordinates={searchCoordinates}
					showRoute={showRoute}
					setCurrentLocation={setCurrentLocation}
					searchLocationCoordinates={searchLocationCoordinates}
					setSearchLocationCoordinates={setSearchLocationCoordinates}
					setShow={setShow}
				/>
			)}
		</Fragment>
	);
};

const Mark = ({ cardDetails, bookingHandler }) => {
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
			map.flyTo([latitude, longitude], 13, { duration: 1 });
		}
	}, [map, latitude, longitude]);

	return (
		<Marker
			icon={markerIcon}
			draggable={false}
			position={[
				cardDetails.g.geopoint.latitude,
				cardDetails.g.geopoint.longitude,
			]}
			ref={markerRef}
		>
			<ChargerPopup chargerData={cardDetails} bookingHandler={bookingHandler} />
		</Marker>
	);
};

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
			map.flyTo([coordinates.latitude, coordinates.longitude], 13, {
				duration: 1,
			});
		}
	}, [map, coordinates]);

	if (!coordinates) {
		return null; // Handle case when coordinates are undefined
	}
	return (
		<Marker
			position={[coordinates.latitude, coordinates.longitude]}
			icon={markerIcon}
			ref={markerRef}
		></Marker>
	);
};

const LocationMarker = ({ setPosition, position, markerIcon }) => {
	const map = useMap();

	useEffect(() => {
		map.locate().on("locationfound", function (e) {
			setPosition(e.latlng);

			map.flyTo(e.latlng, map.getZoom());
		});

		map.on("locationerror", handleOnLocationError);
		function handleOnLocationError(error) {
			alert(`Unable to determine location: ${error.message}`);
		}
	}, [map, setPosition]);

	return position === null ? null : (
		<Marker position={position} icon={markerIcon}></Marker>
	);
};

const mapStateToProps = state => ({
	userData: state.userData,
});
const mapDispatchFromProps = (dispatch) => ({
	setCharger: (data) => dispatch(setChargers(data)),
	clearCharger: (data) => dispatch(clearChargers()),
});

export default connect(mapStateToProps, mapDispatchFromProps)(DashboardMap);
