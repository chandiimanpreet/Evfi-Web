import { AppBar, Toolbar, Button } from "@mui/material";
import { Bolt as BoltIcon } from "@mui/icons-material";
import { useStyles } from "./style";
import { motion } from 'framer-motion';
import "./style.css";
const ReduceNavigation = ({ handleOnclickSource, handleOnclickDestination, selectedValue, textFieldfill }) => {
    const classes = useStyles();
    console.log(selectedValue);
    return (
        <motion.div>
            <AppBar className={classes.rdNavigation}>
                <Toolbar className={classes.toolbarstyle} >
                    <Button
                        id="source-button"
                        aria-describedby='simple-popover'
                        onClick={handleOnclickSource}
                        className={classes.inputBtns}
                        value={selectedValue}
                    >
                        {textFieldfill ? selectedValue : 'Source'}

                    </Button>
                    <BoltIcon className={classes.boltIcon} />
                    <Button
                        id="destination-button"
                        aria-describedby='simple-popover'
                        onClick={handleOnclickDestination}
                        className={classes.inputBtns}
                        value={selectedValue}
                    >
                        {textFieldfill ? selectedValue : 'Destination'}

                    </Button>
                </Toolbar>
            </AppBar >
        </motion.div>
    )
}

export default ReduceNavigation
