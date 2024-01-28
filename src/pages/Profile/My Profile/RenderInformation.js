import React from "react";
import { Grid, TextField } from "@mui/material";
import useStyles from "./styles";

const RenderInformation = ({ field, label, value, isEditing, handleChange, }) => {

    //Styles
    const classes = useStyles();

    return (
        <Grid item key={field} sx={{ marginBottom: {xs: '1rem', sm: '1.5rem' }, display: 'flex', justifyContent: 'center' }}>
            <TextField label={label} variant="outlined" size="small" value={value} disabled={!isEditing} focused
                onChange={(e) => handleChange(field, e.target.value)} className={classes.textField}
            />
        </Grid>
    );
}

export default RenderInformation;