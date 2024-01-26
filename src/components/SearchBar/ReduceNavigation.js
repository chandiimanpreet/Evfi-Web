import { AppBar, Toolbar, Button } from "@mui/material";
import { Bolt as BoltIcon, ArrowCircleLeftOutlined as ArrowCircleLeftOutlinedIcon } from "@mui/icons-material";
import { useStyles } from "./style";
import { motion } from 'framer-motion';

const ReduceNavigation = ({ handleOnclickSource, searchCoordinates, handleOnclickDestination,
    handleOnclickSearchLocation }) => {

    // Styles
    const classes = useStyles();

    return (
        <motion.div>
            <AppBar className={classes.rdNavigation}
          
            
            sx={{ borderRadius: {xs: '0rem', sm: '10rem'},padding:{xs:"0.6rem",sm:"0rem"},width:{xs:"100vw",sm:"70vw",md:"46vw"},left:{xs:"0rem",sm:"calc(50% - 33vw)!important",md:"calc(50% - 23vw)!important"},top:{xs:"0rem",sm:"2.5rem"}}}
            
            >
                <Toolbar className={classes.newtoolbarstyle}
                sx={{ flexDirection: {xs: 'column', sm: 'row'},padding:{xs:"0.3rem",sm:"0.1rem"}}}
                >
                    <Button id="source-button" aria-describedby='simple-popover'
                        onClick={handleOnclickSource} className={classes.inputBtns}
                        sx={{ width: {xs: '90%', sm: '100%'},borderRadius:{xs:"10px",sm:"10rem"}}}
                    >
                        {searchCoordinates && searchCoordinates.source.label !== ''
                            ? searchCoordinates.source.label.substring(0, 26)
                            : 'Source'}
                        {searchCoordinates && searchCoordinates.source.label.length > 26 ? '...' : ''}
                    </Button>
                    <BoltIcon className={classes.boltIcon} 
                    sx={{ margin:{xs:"0.5rem 1rem",sm:"0 1rem"},fontSize:{xs:"1.5rem",sm:"2.5rem"}}}
                    />
                    <Button id="destination-button" maxLength={10} className={classes.inputBtns}
                        aria-describedby='simple-popover' onClick={handleOnclickDestination} 
                        sx={{ width: {xs: '90%', sm: '100%'},borderRadius:{xs:"10px",sm:"10rem"}}}                       
                    >
                        {searchCoordinates && searchCoordinates.destination.label !== ''
                            ? searchCoordinates.destination.label.substring(0, 26)
                            : 'Destination'}
                        {searchCoordinates && searchCoordinates.destination.label.length > 26 ? '...' : ''}
                    </Button>
                    <ArrowCircleLeftOutlinedIcon
                        className={classes.arrowBackIcon}
                        onClick={handleOnclickSearchLocation}
                        sx={{ right: {xs: '0rem', sm: '-5rem'},top:{xs:"3.3rem",sm:"auto"},border:{xs:"2px solid black",sm:"3px solid black "},fontSize:{xs:"2rem",sm:"3rem"}}}
                    />
                </Toolbar>
            </AppBar >
        </motion.div>
    )
}

export default ReduceNavigation