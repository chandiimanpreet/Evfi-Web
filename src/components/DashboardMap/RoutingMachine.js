import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
//for firebase
// import { GeoPoint } from "firebase/firestore";
// import 'firebase/compat/firestore';
// import firebase from "firebase/compat/app";
// import * as geofirestore from 'geofirestore';
// import firebaseConfig from "../../utils/config/firebaseConfig";
// import { Geohash } from "../../utils/queries/searchQueries";

// firebase.initializeApp(firebaseConfig);
// const firestore = firebase.firestore();
// const GeoFirestore = geofirestore.initializeApp(firestore);
// const geocollection = GeoFirestore.collection('chargers');//Reference 

const createRoutineMachineLayer = ({ searchCoordinates }) => {
    //const GeoPoint = firebase.firestore.GeoPoint;
    const { source, destination } = searchCoordinates
    const instance = L.Routing.control({
        createMarker: function () { return null; },
        waypoints: [
            L.latLng(source.coordinates[1], source.coordinates[0]),
            L.latLng(destination.coordinates[1], destination.coordinates[0])
        ],

        routeWhileDragging: false,
        lineOptions: {
            styles: [{ color: "#0047AB", weight: 4 }],
            addWaypoints: false,// route dragging disable 
        },
        show: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
    });
    // instance.on("routesfound", async function (event) {
    //     const routes = event.routes;
    //     const coordinatesArray = routes[0].coordinates;
    //     const equalLength = Math.floor(coordinatesArray.length / 12);
    //     for (let i = 0; i < coordinatesArray.length; i += equalLength) {

    //         const latLng = coordinatesArray[i]; // Get the LatLng object at index i
    //         const latitude = latLng.lat; // Get the latitude from the LatLng object
    //         const longitude = latLng.lng; // Get the longitude from the LatLng object
    //         const geohash = Geohash.encode(latitude, longitude, 9);//get the value of the geohash


    //         const data = {
    //             g: {
    //                 geohash: geohash,
    //                 geopoint: new GeoPoint(latitude, longitude)
    //             },
    //             coordinates: new GeoPoint(latitude, longitude) //its mandetory
    //         };
    //         geocollection.add(data)
    //             .then((docRef) => {
    //                 console.log("Document written with ID: ", docRef.id);
    //             }).catch((error) => {
    //                 console.error("Error adding document: ", error);
    //             });
    //     }

    // });
    return instance;

};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
