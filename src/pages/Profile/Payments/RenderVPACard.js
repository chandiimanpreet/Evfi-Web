import React, { useState } from "react";
import {
    Card, Box, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, TextField,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import useStyles from "./styles";

const SaveVPACard = () => {
    const classes = useStyles();

    const [paymentData, setPaymentData] = useState({
        upiIds: [],
        dialogOpen: false,
        upiIdValue: "",
        nameValue: "",
        errorMessage: "",
    });

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

    const { upiIds, dialogOpen, upiIdValue, nameValue, errorMessage } = paymentData;

    return (
        <Card className={classes.paymentCard}>
            <Typography variant="h6" gutterBottom>
                {upiIds.length === 0 ? "No VPAs saved to be shown" : "Saved VPAs"}
            </Typography>
            <br />
            <Box>
                <Grid container spacing={2} className={classes.outerbox}>
                    {upiIds.map(({ id, name }, index) => (
                        <Card key={index} className={classes.card}>
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
                    ))}
                </Grid>
            </Box>
            <Button
                variant="contained" color="primary" onClick={handleAddUpiId} className={classes.Button}
                sx={{ borderRadius: '4px !important', }}
            >
                Add VPA
            </Button>

            <Dialog
                open={dialogOpen} onClose={() => setPaymentData((prevState) => ({ ...prevState, dialogOpen: false }))}
            >
                <DialogTitle sx={{ fontFamily: 'Manrope', fontWeight: '600' }} >Add UPI ID</DialogTitle>
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