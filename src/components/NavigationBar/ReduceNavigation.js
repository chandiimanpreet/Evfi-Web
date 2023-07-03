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
                        {searchCoordinates && searchCoordinates.source.label !== ''
                            ? searchCoordinates.source.label.substring(0, 26)
                            : 'Source'}
                        {searchCoordinates && searchCoordinates.source.label.length > 26 ? '...' : ''}

                    </Button>
                    <BoltIcon className={classes.boltIcon} />
                    <Button
                        id="destination-button"
                        aria-describedby='simple-popover'
                        onClick={handleOnclickDestination}
                        className={classes.inputBtns}
                        maxLength={10}
                    >
                        {searchCoordinates && searchCoordinates.destination.label !== ''
                            ? searchCoordinates.destination.label.substring(0, 26)
                            : 'Destination'}
                        {searchCoordinates && searchCoordinates.destination.label.length > 26 ? '...' : ''}
                    </Button>
                </Toolbar>
            </AppBar >
        </motion.div>
    )
}

export default ReduceNavigation