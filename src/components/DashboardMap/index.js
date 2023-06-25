import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "./style.css";
import RoutingMachine from "./RoutingMachine";
import { Icon } from 'leaflet'
import NavigationBar from "../NavigationBar";
const DashboardMap = ({ searchCoordinates, show, setSearchCoordinates, showRoute }) => {
	const { source, destination } = searchCoordinates;
	return (
		<div>
			<MapContainer center={[29.9695, 76.8783]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{show &&
					<div>
						<Marker position={[source[1], source[0]]} icon={new Icon({ iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
						/>
						<Marker position={[destination[1], destination[0]]}
							icon={new Icon({ iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
						/>
						<RoutingMachine searchCoordinates={searchCoordinates} />
					</div>
				}
			</MapContainer>
			<NavigationBar setSearchCoordinates={setSearchCoordinates}
				searchCoordinates={searchCoordinates}
				showRoute={showRoute}
			/>
		</div>
	);
};
export default DashboardMap;