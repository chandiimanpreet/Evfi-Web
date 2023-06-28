import { MapContainer, Marker, TileLayer } from "react-leaflet";
// import "./style.css";
import RoutingMachine from "./RoutingMachine";
import { Icon } from 'leaflet'
import NavigationBar from "../NavigationBar";
import FindCurrentLocation from "./FindCurrentLocation";
import { useLocation } from "react-router";

const DashboardMap = ({ searchCoordinates, show, setSearchCoordinates, showRoute, showCurrentLocation, setCurrentLocation }) => {
	const location = useLocation();
	return (
		<div>
			<MapContainer center={[29.9695, 76.8783]} zoom={13} scrollWheelZoom={false}>
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
				{showCurrentLocation &&
					<FindCurrentLocation />
				}
			</MapContainer>
			{location.pathname === '/' &&
				<NavigationBar setSearchCoordinates={setSearchCoordinates}
					searchCoordinates={searchCoordinates}
					showRoute={showRoute}
					setCurrentLocation={setCurrentLocation}
				/>
			}
		</div>
	);
};
export default DashboardMap;