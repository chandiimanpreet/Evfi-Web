import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Switch,
  Button,
} from "@mui/material";
import useStyles from "./styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import CallMadeIcon from "@mui/icons-material/CallMade";

const socialAccounts = [
  { platform: "Google", connected: false, icon: <GoogleIcon /> },
  { platform: "Twitter", connected: true, icon: <TwitterIcon /> },
  { platform: "Instagram", connected: false, icon: <InstagramIcon /> },
  { platform: "Facebook", connected: true, icon: <FacebookIcon /> },
];

const Settings = () => {
  const classes = useStyles();

  const handleToggleConnection = (platform, connected) => {
    console.log(`${connected ? "Disconnect from" : "Connect to"} ${platform}`);
  };

  const handlePasswordChange = () => {
    console.log("Password changed");
  };

  return (
    <Box
      className={classes.root}
    >
      <Typography variant="h5" gutterBottom fontWeight="bold" fontSize="25px" color="white">
        Settings
      </Typography>
      <Grid>
        <Grid item xs={12} className={classes.container}>
          <Card className={classes.settingsCard}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
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
                    <Button
                      variant="text"
                      className={classes.Button}
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
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Notifications
            </Typography>
            <List>
              {["Notification Popups", "Send notifications by mail", "Notification Sound", "Feature Announcements"].map(
                (notification) => (
                  <ListItem key={notification}>
                    <ListItemText primary={notification} />
                    <Switch color="primary" />
                  </ListItem>
                )
              )}
            </List>
          </Card>

          <Card className={classes.settingsCard}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Privacy and Security
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Change Password" />
                <Button
                  variant="text"
                  color="primary"
                  onClick={handlePasswordChange}
                  className={classes.Button}
                >
                  Change Password
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="Privacy Policy" />
                <Button className={classes.Button}>
                  <CallMadeIcon />
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
