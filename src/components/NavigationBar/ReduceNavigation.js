import { AppBar, Toolbar, Button } from "@mui/material";
import { Bolt as BoltIcon } from "@mui/icons-material";
import { useStyles } from "./style";
import { motion } from 'framer-motion';

const ReduceNavigation = ({ onchangeDistance }) => {
    const classes = useStyles();
    return (
        <motion.div>
            <AppBar className={classes.rdNavigation}>
                <Toolbar className={classes.toolbarstyle} >
                    <Button aria-describedby='simple-popover'
                        onClick={
                            onchangeDistance
                        }
                        className={classes.inputBtns}
                    >
                        Source
                    </Button>
                    <BoltIcon className={classes.boltIcon} />
                    <Button aria-describedby='simple-popover'
                        onClick={
                            onchangeDistance
                        }
                        className={classes.inputBtns}
                    >
                        Destination
                    </Button>
                </Toolbar>
            </AppBar >
        </motion.div>
    )
}

export default ReduceNavigation
