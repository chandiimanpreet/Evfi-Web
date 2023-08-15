import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "./style.css";
import DashboardMap from ".";

const OpenLocation = () => {

    const map = useMap();
    
    // States
    const [center, setCenter] = useState(null);

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setCenter(e.latlng);
        });
    }, [map]);

    return (
        <DashboardMap center={center} />
    )
}
export default OpenLocation
