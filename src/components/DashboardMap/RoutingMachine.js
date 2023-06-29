import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
const createRoutineMachineLayer = ({ searchCoordinates }) => {
    const { source, destination } = searchCoordinates
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(source.coordinates[1], source.coordinates[0]),
            L.latLng(destination.coordinates[1], destination.coordinates[0])
        ],
        lineOptions: {
            styles: [{ color: "#0047AB", weight: 4 }]
        },
        fitSelectedRoutes: true,
        showAlternatives: true,
    });
    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;