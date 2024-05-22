import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
// import { nearByChargers } from "./script";

const createRoutineMachineLayer = ({ searchCoordinates }) => {
  const { source, destination } = searchCoordinates;
  const instance = L.Routing.control({
    createMarker: function () {
      return null;
    },
    waypoints: [
      L.latLng(source.coordinates[1], source.coordinates[0]),
      L.latLng(destination.coordinates[1], destination.coordinates[0]),
    ],

    routeWhileDragging: false,
    lineOptions: {
      styles: [{ color: "#0047AB", weight: 4 }],
      addWaypoints: false, // route dragging disable
    },
    show: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });
  // instance.on("routesfound", async (e) => { nearByChargers(e); })

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
