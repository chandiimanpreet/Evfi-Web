import React, { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import "./style.css";
import { Icon } from "leaflet";

const FindCurrentLocation = ({ setSearchCoordinates, searchCoordinates }) => {
  const map = useMap();

  // States
  const [position, setPosition] = useState(null);

  useEffect(() => {
    map
      .locate({
        enableHighAccuracy: true,
      })
      .on("locationfound", function (e) {
        setPosition(e.latlng); //add position
        setSearchCoordinates((prevSearchCoordinates) => ({
          ...prevSearchCoordinates, //shaperator operator diye old value ja chilo setai rakhbo
          source: {
            coordinates: [e.latlng.lng, e.latlng.lat],
            label: `${e.latlng.lat}+${e.latlng.lng}`,
          },
          destination: {
            coordinates: prevSearchCoordinates.destination.coordinates,
            label: prevSearchCoordinates.destination.label,
          },
        })); // if click current location overwrite and set the label
        map.flyTo(e.latlng, map.getZoom());
      });
  }, [map, searchCoordinates, setSearchCoordinates]);

  return position === null ? null : (
    <Marker
      position={position}
      icon={
        new Icon({
          iconUrl:
            "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    ></Marker>
  );
};
export default FindCurrentLocation;
