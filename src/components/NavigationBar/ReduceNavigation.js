import { AppBar, Toolbar, Button } from "@mui/material";
import { Bolt as BoltIcon } from "@mui/icons-material";
import { useStyles } from "./style";
import { motion } from 'framer-motion';

const ReduceNavigation = ({ handleOnclickSource, searchCoordinates, handleOnclickDestination }) => {
    const classes = useStyles();

    return (
        <motion.div>
            <AppBar className={classes.rdNavigation}>
                <Toolbar className={classes.toolbarstyle} >
                    <Button
                        id="source-button"
                        aria-describedby='simple-popover'
                        onClick={handleOnclickSource}
                        className={classes.inputBtns}
                    >
                        {searchCoordinates && searchCoordinates.source.label !== '' ? searchCoordinates.source.label : 'Source'}

                    </Button>
                    <BoltIcon className={classes.boltIcon} />
                    <Button
                        id="destination-button"
                        aria-describedby='simple-popover'
                        onClick={handleOnclickDestination}
                        className={classes.inputBtns}
                    >
                        {searchCoordinates && searchCoordinates.destination.label !== '' ? searchCoordinates.destination.label : 'Destination'}
                    </Button>
                </Toolbar>
            </AppBar >
        </motion.div>
    )
}

export default ReduceNavigation