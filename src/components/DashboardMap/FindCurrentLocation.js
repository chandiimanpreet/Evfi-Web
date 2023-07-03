import React, { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import "./style.css";
import { Icon } from 'leaflet'

const FindCurrentLocation = ({ setSearchCoordinates, searchCoordinates }) => {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            setSearchCoordinates({ ...searchCoordinates, source: { coordinates: [e.latlng.lng, e.latlng.lat], label: `${e.latlng.lat}+${e.latlng.lng}` } }) // if click current location overwrite and set the label
            map.flyTo(e.latlng, map.getZoom());
        });
    }, [map, searchCoordinates, setSearchCoordinates]);
    console.log(position);

    return (
        position === null ? null : (
            <Marker position={position} icon={new Icon({ iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
            </Marker>
        )
    )
}

export default FindCurrentLocation

