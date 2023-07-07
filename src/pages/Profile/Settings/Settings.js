import React from "react";
import {
    Box, Typography, Grid, Card, List, ListItem, ListItemText, Switch, Button,
} from "@mui/material";
import { Facebook, Google, Twitter, Instagram, CallMade } from "@mui/icons-material";
import useStyles from "./styles";

const socialAccounts = [
    { platform: "Google", connected: false, icon: <Google /> },
    { platform: "Twitter", connected: true, icon: <Twitter /> },
    { platform: "Instagram", connected: false, icon: <Instagram /> },
    { platform: "Facebook", connected: true, icon: <Facebook /> },
];

const Settings = () => {

    //Styles
    const classes = useStyles();

    //Handlers
    const handleToggleConnection = (platform, connected) => {
        console.log(`${connected ? "Disconnect from" : "Connect to"} ${platform}`);
    };

    const handlePasswordChange = () => {
        console.log("Password changed");
    };

    return (
        <Box className={classes.root}>
            <Typography variant="h5" gutterBottom fontWeight="bold" fontSize="25px" color="white" fontFamily='Manrope'>
                Settings
            </Typography>
            <Grid>
                <Grid item xs={12} className={classes.container}>
                    <Card className={classes.settingsCard}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope'>
                            Social Account
                        </Typography>
                        <List>
                            {socialAccounts.map((account) => (
                                <ListItem key={account.platform} className={classes.listItem}>
                                    <Box className={classes.platformName}>
                                        {account.icon}
                                        &nbsp;&nbsp;
                                        <ListItemText primaryTypographyProps={{ style: { fontFamily: 'inter !important', } }}
                                            primary={account.platform}
                                        />
                                    </Box>
                                    <Box className={classes.connectButtonContainer}>
                                        <Button variant="text" className={classes.Button}
                                            onClick={() => handleToggleConnection(account.platform, account.connected)}
                                        >
                                            {account.connected ? "Disconnect" : "Connect"}
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Card>

                    <Card className={classes.settingsCard}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope'>
                            Notifications
                        </Typography>
                        <List>
                            {["Notification Popups", "Send notifications by mail", "Notification Sound", "Feature Announcements"]
                                .map(
                                    (notification) => (
                                        <ListItem key={notification}>
                                            <ListItemText primary={notification} primaryTypographyProps={{
                                                style: { fontFamily: 'inter !important', }
                                            }} />
                                            <Switch color="primary" />
                                        </ListItem>
                                    )
                                )}
                        </List>
                    </Card>

                    <Card className={classes.settingsCard}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope'>
                            Privacy and Security
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Change Password" primaryTypographyProps={{ style: { fontFamily: 'inter !important', } }} />
                                <Button variant="text" color="primary" onClick={handlePasswordChange} className={classes.Button}>
                                    Change Password
                                </Button>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Privacy Policy" primaryTypographyProps={{ style: { fontFamily: 'inter !important', } }} />
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
