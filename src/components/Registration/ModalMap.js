import React, { Fragment, } from 'react';
import { MapContainer, TileLayer, useMap, } from "react-leaflet";
import { GpsFixed, } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useStyles } from '../../pages/auths/style';

const ModalMap = ({ data, setUserData, handleClose }) => {

    return (
        <div>
            <MapContainer center={[29.9695, 76.8783]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CurrentLocationMarker data={data} setUserData={setUserData} handleClose={handleClose} />
            </MapContainer>
        </div>
    )
}

export default ModalMap

const CurrentLocationMarker = ({ data, setUserData, handleClose }) => {

    const map = useMap();

    //Styling
    const classes = useStyles();

    // Handlers
    map.on("click", function () {
        setUserData({ ...data, chargerLocation: map.getCenter() })
    });

    const getCurrentLocation = () => {
        map.locate({ enableHighAccuracy: true, }).on("locationfound", (e) => {
            map.flyTo(e.latlng, 13, { duration: 1 });
        });
    }

    return (
        <Fragment>
            <Button onClick={handleClose} className={classes.setLocationBtn} >
                Set Location
            </Button>
            <GpsFixed
                onClick={getCurrentLocation} className={classes.currentLocationBtn} />
            <Box sx={{
                zIndex: 1500, position: 'absolute', top: '49%', left: '50%', transform: 'translate(-50%, -50%)',
            }}>
                <img src='/resources/marker.png' alt='MARKER' width='30px' height='30px' />
            </Box>
        </Fragment>
    );
}