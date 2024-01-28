import React, { useState } from "react";
import {
    Card, Box, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, TextField,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import useStyles from "./styles";

const SaveVPACard = () => {

    //States
    const [paymentData, setPaymentData] = useState({
        upiIds: [],
        dialogOpen: false,
        upiIdValue: "",
        nameValue: "",
        errorMessage: "",
    });
    const { upiIds, dialogOpen, upiIdValue, nameValue, errorMessage } = paymentData;

    //Styles
    const classes = useStyles();

    //Handlers
    const handleAddUpiId = () => {
        setPaymentData((prevState) => ({
            ...prevState,
            dialogOpen: true,
        }));
    };

    const handleSaveUpiId = () => {

        const { upiIdValue, nameValue } = paymentData;

        if (!upiIdValue.includes("@")) {
            setPaymentData((prevState) => ({
                ...prevState,
                errorMessage: "Please enter a valid UPI ID",
            }));
            return;
        }

        setPaymentData((prevState) => ({
            upiIds: [...prevState.upiIds, { id: upiIdValue, name: nameValue }],
            dialogOpen: false,
            upiIdValue: "",
            nameValue: "",
            errorMessage: "",
        }));
    };

    const handleRemoveUpiId = (index) => {
        setPaymentData((prevState) => ({
            ...prevState,
            upiIds: prevState.upiIds.filter((_, i) => i !== index),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Card sx={{padding: {xs: '0.8rem', sm: '2rem'}}} className={classes.paymentCard}>
            <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope !important'>
                {upiIds.length === 0 ? "No VPAs saved to be shown" : "Saved VPAs"}
            </Typography>
            <br />
            <Box >
                <Grid container spacing={2} >
                    {upiIds.map(({ id, name }, index) => (
                        <Grid item xs={12} sm={6} sx={{display:"flex", justifyContent: {xs: "center", sm: "flex-start"} }}>
                            <Card key={index} sx={{ width: { xs: "15rem", md: "15rem", lg: "18.75rem" } }} className={classes.card}>
                                <Box className={classes.idLabel}>
                                    <Typography variant="body1" fontSize={14} fontWeight="bold">
                                        {id}
                                    </Typography>
                                    <PaidIcon fontSize="large" />
                                </Box>
                                <br />
                                <Box>
                                    <Typography variant="caption" fontSize={11}>
                                        ACCOUNT HOLDER
                                    </Typography>
                                    <Typography variant="body2" fontSize={14}>
                                        {name}
                                    </Typography>
                                </Box>
                                <hr />
                                <Button onClick={() => handleRemoveUpiId(index)}>REMOVE</Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Button 
                variant="contained" color="primary" onClick={handleAddUpiId} className={classes.Button}
                sx={{ borderRadius: '4px !important', marginTop: "1rem" }}
            >
                Add VPA
            </Button>

            <Dialog
                open={dialogOpen} onClose={() => setPaymentData((prevState) => ({ ...prevState, dialogOpen: false }))}
            >
                <DialogTitle sx={{ fontFamily: 'Manrope !important', fontWeight: '600' }} >Add UPI ID</DialogTitle>
                <DialogContent>
                    <TextField label="UPI ID" name="upiIdValue" value={upiIdValue} onChange={handleChange} fullWidth
                        margin="normal" className={classes.textField}
                    />
                    <TextField label="Name" name="nameValue" value={nameValue} onChange={handleChange} fullWidth
                        margin="normal" className={classes.textField}
                    />
                    {errorMessage && (
                        <Typography variant="body2" color="error" marginY={1}>{errorMessage}</Typography>
                    )}
                </DialogContent>
                <Button variant="contained" color="primary" onClick={handleSaveUpiId} className={classes.Button}>
                    Save
                </Button>
            </Dialog>
        </Card>
    );
};

export default SaveVPACard;