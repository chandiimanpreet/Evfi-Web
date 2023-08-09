import { AppBar, Toolbar, TextField, Autocomplete, Box } from "@mui/material";
import { Bolt as BoltIcon, Directions as DirectionsIcon } from "@mui/icons-material";
import { useStyles } from "./style";
import { motion } from 'framer-motion';
const PlaceSearchingNavigationbar = ({
    handleOnclickSource,
    distanceData,
    onChangeRoute,
    searchLocationCoordinates,
    setSearchLocationCoordinates

}) => {
    const classes = useStyles();
    return (
        <motion.div>
            <AppBar className={classes.searchNavigation}>
                <Toolbar className={classes.toolbarstyle} >
                    <BoltIcon className={classes.searchboltIcon} />
                    <Box className={classes.extendinputroot}>
                        <Autocomplete
                            clearIcon
                            disablePortal
                            id="combo-box-demo"
                            value={searchLocationCoordinates.searchlocation.label}
                            options={distanceData}
                            data-shrink="false!important"
                            className={classes.searchPlaceAutoComplete}
                            sx={{ right: '2.3rem' }}
                            renderInput={(params) =>
                                <TextField
                                    value={searchLocationCoordinates.searchlocation.label}
                                    onChange={onChangeRoute}
                                    inputProps={{ sx: { color: '#fff' }, maxLength: 12 }}
                                    className={classes.popDesign} {...params}
                                    id="destination-textfield"
                                    placeholder="Search any location"

                                />
                            }
                            onChange={(event, newValue) => {
                                console.log(newValue);
                                if (newValue) {
                                    setSearchLocationCoordinates({ ...searchLocationCoordinates, searchlocation: { coordinates: newValue.coordinates, label: newValue.label } })
                                } else {
                                    setSearchLocationCoordinates({ searchlocation: { coordinates: null, label: '' } })
                                }
                            }}
                        />
                    </Box>
                    <DirectionsIcon
                        onClick={handleOnclickSource}
                        className={classes.directionsIcon}
                    />
                </Toolbar>
            </AppBar >
        </motion.div>
    )
}

export default PlaceSearchingNavigationbar
