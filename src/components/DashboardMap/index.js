import { MapContainer, TileLayer } from "react-leaflet";
import "./style.css";

const DashboardMap = () => {
	return (
		<div>
			<MapContainer center={[29.9695, 76.8783]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</MapContainer>
		</div>
	);
};

export default DashboardMap;
