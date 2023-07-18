import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "./style.css";
//import { Icon } from 'leaflet'
import DashboardMap from ".";


const OpenLocation = () => {
    const [center, setCenter] = useState(null);
    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {

            setCenter(e.latlng);
        });
    }, [map]);
    console.log(center);

    return (
        <DashboardMap center={center} />
    )
}
export default OpenLocation
