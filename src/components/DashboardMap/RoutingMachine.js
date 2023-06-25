import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
const createRoutineMachineLayer = ({ searchCoordinates }) => {
    const { source, destination } = searchCoordinates
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(source[1], source[0]),
            L.latLng(destination[1], destination[0])
        ],
        lineOptions: {
            styles: [{ color: "red", weight: 5 }]
        },
        fitSelectedRoutes: true,
        showAlternatives: true,
    });
    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;