import "leaflet-routing-machine";
//for firebase
import { GeoPoint } from "firebase/firestore";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import * as geofirestore from 'geofirestore';
import firebaseConfig from "./../../utils/config/firebaseConfig.js";
import { Geohash } from "../../utils/queries/searchQueries.js";

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const GeoFirestore = geofirestore.initializeApp(firestore);
const geocollection = GeoFirestore.collection('chargers');//Reference

export const nearByChargers = (event) => {

    const routes = event.routes;
    const coordinatesArray = routes[0].coordinates;
    const equalLength = Math.floor(coordinatesArray.length / 5);

    for (let i = 0; i < coordinatesArray.length; i += equalLength) {

        const latLng = coordinatesArray[i]; // Get the LatLng object at index i
        const latitude = latLng.lat; // Get the latitude from the LatLng object
        const longitude = latLng.lng; // Get the longitude from the LatLng object
        const geohash = Geohash.encode(latitude, longitude, 9);//get the value of the geohash

        const data = {
            g: {
                geohash: geohash,
                geopoint: new GeoPoint(latitude, longitude)
            },
            coordinates: new GeoPoint(latitude, longitude) //its mandetory
        };
        geocollection.add(data)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

};
