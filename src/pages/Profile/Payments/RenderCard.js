import React, { useState } from "react";
import {
    Card, Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, Grid,
} from "@mui/material";
import useStyles from "./styles";
import PaidIcon from "@mui/icons-material/Paid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const RenderCard = () => {

    //States
    const [cardData, setCardData] = useState({
        cards: [],
        dialogOpen: false,
        cardNumberValue: "",
        expiryDateValue: null,
        nameValue: "",
        errorMessage: "",
    });
    const { cards, dialogOpen, cardNumberValue, expiryDateValue, nameValue, errorMessage } = cardData;

    //Styles
    const classes = useStyles();

    //Handlers
    const handleToggleDialog = (isOpen) => {
        setCardData((prevState) => ({
            ...prevState,
            dialogOpen: isOpen,
        }));
    };

    const handleSaveCard = () => {
        const { cardNumberValue, expiryDateValue, nameValue } = cardData;
        if (!cardNumberValue || !expiryDateValue || !nameValue) {
            setCardData((prevState) => ({
                ...prevState,
                errorMessage: "Please enter all the card details",
            }));
            return;
        }

        const newCard = {
            cardNumber: cardNumberValue,
            expiryDate: expiryDateValue.format("MM/YYYY"),
            name: nameValue,
        };

        setCardData((prevState) => ({
            ...prevState,
            cards: [...prevState.cards, newCard],
            dialogOpen: false,
            cardNumberValue: "",
            expiryDateValue: null,
            nameValue: "",
            errorMessage: "",
        }));
    };

    const handleRemoveCard = (index) => {
        setCardData((prevState) => ({
            ...prevState,
            cards: prevState.cards.filter((_, i) => i !== index),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setCardData((prevState) => ({
            ...prevState,
            expiryDateValue: date,
        }));
    };

    return (
        <Card className={classes.paymentCard}>
            <Typography variant="h6" gutterBottom fontWeight="bold" fontFamily='Manrope'>
                {cards.length === 0 ? "No Cards saved to be shown" : "Saved Cards"}
            </Typography>
            <br />
            <Box>
                <Grid container spacing={2} className={classes.outerbox}>
                    {cards.map((card, index) => (
                        <Card key={index} className={classes.card}>
                            <Box className={classes.idLabel}>
                                <Typography variant="body1" fontSize={14} fontWeight="bold">
                                    {card.cardNumber}
                                </Typography>
                                <PaidIcon fontSize="large" />
                            </Box>
                            <br />
                            <Box className={classes.cardInformation}>
                                <Box>
                                    <Typography variant="caption" fontSize={11}>
                                        ACCOUNT HOLDER
                                    </Typography>
                                    <Typography variant="body2" fontSize={14}>
                                        {card.name}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" fontSize={11}>
                                        Expiry Date
                                    </Typography>
                                    <Typography variant="body2" fontSize={14}>
                                        {card.expiryDate}
                                    </Typography>
                                </Box>
                            </Box>
                            <hr />
                            <Button onClick={() => handleRemoveCard(index)}>REMOVE</Button>
                        </Card>
                    ))}
                </Grid>
            </Box>
            <Button variant="contained" color="primary" onClick={() => handleToggleDialog(true)} className={classes.Button}
                sx={{ borderRadius: '4px !important', }}
            >
                Add Card
            </Button>

            <Dialog open={dialogOpen} onClose={() => handleToggleDialog(false)}
                PaperProps={{ style: { width: "400px", height: "350px", }, }}
            >
                <DialogTitle fontFamily='Manrope' fontWeight='600' >Add Card</DialogTitle>
                <DialogContent>
                    <TextField label="Card Number" name="cardNumberValue" value={cardNumberValue}
                        onChange={handleChange} fullWidth margin="normal" className={classes.textField}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Expiry Date" value={expiryDateValue} onChange={handleDateChange}
                            className={classes.datePicker}
                            renderInput={(props) => (
                                <TextField {...props} fullWidth margin="normal" InputProps={{ style: { width: "100%", }, }} />
                            )}
                        />
                    </LocalizationProvider>
                    <TextField label="Name" name="nameValue" value={nameValue} onChange={handleChange} fullWidth margin="normal" className={classes.textField} />
                    {errorMessage && (
                        <Typography variant="body2" color="error" marginY={1}>{errorMessage}</Typography>
                    )}
                </DialogContent>
                <Button variant="contained" color="primary" onClick={handleSaveCard} className={classes.Button}>
                    Save
                </Button>
            </Dialog>
        </Card>
    );
};

export default RenderCard;