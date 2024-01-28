import React from "react";
import {
    Box, Typography, Grid, Card, List, ListItem, ListItemText, Switch, Button,
} from "@mui/material";
import { Facebook, Google, Twitter, Instagram, CallMade } from "@mui/icons-material";
import useStyles from "./styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const socialAccounts = [
    { platform: "Google", connected: false, icon: <Google /> },
    { platform: "Twitter", connected: true, icon: <Twitter /> },
    { platform: "Instagram", connected: false, icon: <Instagram /> },
    { platform: "Facebook", connected: true, icon: <Facebook /> },
];

const Settings = ({ setActivePage }) => {

    //Styles
    const classes = useStyles();

    //Handlers
    const handleToggleConnection = (platform, connected) => {
        console.log(`${connected ? "Disconnect from" : "Connect to"} ${platform}`);
    };

    const handlePasswordChange = () => {
        console.log("Password changed");
    };

    const handleBackButton = () => {
        console.log("click")
        setActivePage(false);

    };

    return (
        <Box sx={{ width: { xs: "93vw", md: "41rem", lg: "50rem" }, height: { xs: "39.5rem", md: "35rem", lg: "35rem" }, paddingTop: { xs: '1rem', md: "0rem" }, overflow: "auto" }} className={classes.main}>
            <Box display="flex" flexDirection="row" marginLeft="0.5rem" alignItems="center">
                <ArrowBackIcon onClick={handleBackButton} sx={{ color: 'white', display: { xs: 'block', md: 'none' } }} />
                <Typography variant="h5" margin="0 1rem" gutterBottom fontWeight="bold" fontSize="25px" fontFamily="Manrope"
                    color={"white"}>
                    Settings
                </Typography>
            </Box>
            <Grid>
                <Grid item xs={12} className={classes.container}>
                    <Card className={classes.settingsCard}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope !important'>
                            Social Account
                        </Typography>
                        <List>
                            {socialAccounts.map((account) => (
                                <ListItem key={account.platform} className={classes.listItem}>
                                    <Box className={classes.platformName}>
                                        {account.icon}
                                        &nbsp;&nbsp;
                                        <ListItemText primary={account.platform} />
                                    </Box>
                                    <Box className={classes.connectButtonContainer}>
                                        <Button variant="text" className={classes.Button}
                                            onClick={() => handleToggleConnection(account.platform, account.connected)}
                                        >
                                            {account.connected ? "Connected" : "Connect"}
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Card>

                    <Card className={classes.settingsCard}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope !important'>
                            Notifications
                        </Typography>
                        <List>
                            {["Notification Popups", "Send notifications by mail", "Notification Sound", "Feature Announcements"]
                                .map(
                                    (notification) => (
                                        <ListItem className={classes.listItem} key={notification}>
                                            <ListItemText primary={notification} />
                                            <Switch color="primary" />
                                        </ListItem>
                                    )
                                )}
                        </List>
                    </Card>

                    <Card className={classes.settingsCard}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope !important'>
                            Privacy and Security
                        </Typography>
                        <List>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary="Change Password" />
                                <Button onclick={handlePasswordChange} className={classes.Button}>
                                    <CallMade />
                                </Button>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary="Privacy Policy" />
                                <Button className={classes.Button}>
                                    <CallMade />
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Settings;