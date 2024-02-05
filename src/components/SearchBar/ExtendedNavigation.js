import React from "react";
import { Box, Popover, TextField, Autocomplete } from "@mui/material";
import {
  Bolt as BoltIcon,
  SwapHorizontalCircle as SwapHorizontalCircleIcon,
  MyLocation as MyLocationIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useStyles } from "./style";

const ExtendedNavigation = ({
  anchorEl,
  handleClose,
  distanceData,
  onChangeRoute,
  setSearchCoordinates,
  searchCoordinates,
  autofocusedSource,
  autofocusedDestination,
  setCurrentLocation,
}) => {
  // Styles
  const classes = useStyles();

  return (
    <motion.div>
      <Popover
        id="simple-popover"
        open={true}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.exNavPopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box
          className={classes.extendnavigationroot}
          //height={["9rem", "9rem","9rem","auto"]}
          sx={{
            borderRadius: { xs: "0rem", sm: "10rem" },
            top: { xs: "-2rem!important", sm: "0rem!important" },
            left: { xs: "-1rem" },
            height: { xs: "9.6rem", sm: "auto" },
            width: { xs: "100vw", sm: "85vw", md: "93" },
          }}
          //  borderRadius={["0rem","10rem"]}
          //  top={["-2rem!important","0rem!important"]}
          // left={["-1rem!important", "0.3 rem!important"]}
          // height={["11rem","auto"]}
          // width={["100vw","85vw"]}
          // width={["85rem"]}
        >
          <Box className={classes.bigboltIconRoot}>
            <BoltIcon
              className={classes.bigboltIcon}
              sx={{
                top: { xs: "0.5rem", sm: "-2.3rem" },
                left: { xs: "5.3rem", sm: "6rem" },
                border: { xs: "2px solid yellow", sm: "4px solid yellow" },
                fontSize: { xs: "1.3rem", sm: "2.3rem" },
              }}
              // fontSize={["1.1rem","1.1rem","1.1rem","2.3rem"]}
            />
          </Box>
          <Box
            className={classes.extendinputroot}
            flexDirection={["column", "row"]}
            top={["-0.5rem", "0rem"]}
          >
            <MyLocationIcon
              className={classes.myLocationIcon}
              onClick={() => setCurrentLocation(true)}
              sx={{
                left: { xs: "0.6rem", sm: "4rem" },
                fontSize: { xs: "1.8rem", sm: "2rem" },
                top: { xs: "0.8rem", sm: "auto" },
                position: { xs: "absolute", sm: "relative" },
              }}
              //left={["0rem","0rem","0rem",]}
              // fontSize={["1.5rem","1.5rem","2rem"]}
              //right={["9rem","9rem","0rem"]}
              //sx={{left:{sm:"4rem"},right:{xs:"10rem",sm:"0rem"},fontSize:{xs:"1.5rem",sm:"2rem"},top:{xs:"3rem"}}}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={distanceData}
              value={searchCoordinates.source.label || ""}
              className={classes.autocompletestyle}
              sx={{
                position: { xs: "sticky", sm: "relative", md: "relative" },
                left: { xs: "2.3rem" },
                width: { xs: "87vw", sm: "87svw", md: "33vw" },
                padding: { xs: "0rem 0rem", sm: "0.5rem 0.5rem" },
              }}
              //aria-posinset={["9rem","9rem","0rem"]}
              renderInput={(params) => (
                <TextField
                  {...(autofocusedSource
                    ? { autoFocus: true }
                    : { autoFocus: false })}
                  onChange={onChangeRoute}
                  inputProps={{ sx: { color: "#fff" }, maxLength: 12 }}
                  className={classes.popDesign}
                  {...params}
                  id="destination-textfield"
                  placeholder="Source"
                />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  console.log(newValue);
                  setSearchCoordinates({
                    ...searchCoordinates,
                    source: {
                      coordinates: newValue.coordinates,
                      label: newValue.label,
                    },
                  });
                }
              }}
            />
            <SwapHorizontalCircleIcon
              className={classes.swapHorizontalCircleIcon}
              //fontSize={["1.5rem","1.5rem","2.5rem"]
              sx={{
                transform: { xs: "rotate(90deg)", sm: "rotate(0deg)" },
                marginLeft: { xs: "0px", sm: "31px" },
                fontSize: { xs: "2rem", sm: "3rem" },
              }}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={distanceData}
              value={searchCoordinates.destination.label || ""}
              className={classes.autocompletestyle}
              //fullWidth={["89rem","89rem","89rem","33rem"]}
              sx={{
                position: { xs: "sticky", sm: "sticky", md: "relative" },
                left: { xs: "2rem", sm: "2rem", md: "auto" },
                width: { xs: "87vw", sm: "87vw", md: "33vw" },
                padding: { xs: "0rem 0rem", sm: "0.5rem 0.5rem" },
              }}
              renderInput={(params) => (
                <TextField
                  value={searchCoordinates.destination.label}
                  {...(autofocusedDestination
                    ? { autoFocus: true }
                    : { autoFocus: false })}
                  onChange={onChangeRoute}
                  inputProps={{ sx: { color: "#fff" }, maxLength: 12 }}
                  className={classes.popDesign}
                  {...params}
                  id="destination-textfield"
                  placeholder="Destination"
                />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSearchCoordinates({
                    ...searchCoordinates,
                    destination: {
                      coordinates: newValue.coordinates,
                      label: newValue.label,
                    },
                  });
                }
              }}
            />
          </Box>
        </Box>
        {/* <TuneIcon className={classes.filterdesign} /> */}
      </Popover>
    </motion.div>
  );
};

export default ExtendedNavigation;
