import { AppBar, Toolbar, TextField, Autocomplete, Box } from "@mui/material";
import { Bolt as BoltIcon, Directions as DirectionsIcon, Clear as ClearIcon} from "@mui/icons-material";
import { useStyles } from "./style";
import { motion } from "framer-motion";

const PlaceSearchingNavigationbar = ({
  handleOnclickSource,
  distanceData,
  onChangeRoute,
  searchLocationCoordinates,
  setSearchLocationCoordinates,
}) => {
  // Styles
  const classes = useStyles();

  return (
    <motion.div>
      <AppBar
        className={classes.searchNavigation}
        sx={{
          width: { xs: "100%", sm: "100%", md: "48%" },
          left: { xs: "0", sm: "0", md: "calc(50% - 23vw)!important" },
        }}
      >
        <Toolbar
          className={classes.toolbarstyle}
          sx={{
            height: { xs: "1rem", sm: "auto", md: "auto%" },
          }}
        >
          <BoltIcon
            className={classes.searchboltIcon}
            sx={{
              fontSize: {
                xs: "1.5rem!important",
                sm: "2.3rem!important",
                md: "2.5rem!important",
              },
            }}
          />
          <Box className={classes.extendinputroot}>
            <Autocomplete
              clearIcon={<ClearIcon/>}
              disablePortal
              id="combo-box-demo"
              value={searchLocationCoordinates.searchlocation.label}
              options={distanceData}
              data-shrink="false!important"
              className={classes.searchPlaceAutoComplete}
              sx={{
                padding: {
                  xs: "0.1rem  0.1rem 0.5rem 0.1rem",
                  sm: "0.5rem 0.5rem",
                },
              }}
              renderInput={(params) => (
                <TextField
                  value={searchLocationCoordinates.searchlocation.label}
                  onChange={onChangeRoute}
                  placeholder="Search any location"
                  inputProps={{ sx: { color: "#fff" }, maxLength: 12 }}
                  className={classes.popDesign}
                  {...params}
                  id="destination-textfield"
                />
              )}
              onChange={(event, newValue) => {
                console.log(newValue);
                if (newValue) {
                  setSearchLocationCoordinates({
                    ...searchLocationCoordinates,
                    searchlocation: {
                      coordinates: newValue.coordinates,
                      label: newValue.label,
                    },
                  });
                } else {
                  setSearchLocationCoordinates({
                    searchlocation: { coordinates: null, label: "" },
                  });
                }
              }}
            />
          </Box>
          <DirectionsIcon
            onClick={handleOnclickSource}
            className={classes.directionsIcon}
            sx={{
              fontSize: { xs: "1.5rem", sm: "2.3rem", md: "2.5rem!important" },
            }}
          />
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default PlaceSearchingNavigationbar;
