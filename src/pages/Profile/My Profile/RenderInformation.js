import React from "react";
import { Grid, TextField } from "@mui/material";
import useStyles from "./styles";

const RenderInformation = ({ field, label, value, isEditing, handleChange, }) => {

    //Styles
    const classes = useStyles();

    return (
        <Grid item xs={6} key={field} style={{ marginBottom: "22px", display: 'flex' }}>
            <TextField label={label} variant="outlined" size="small" value={value} disabled={!isEditing} focused
                onChange={(e) => handleChange(field, e.target.value)} className={classes.textField}
            />
        </Grid>
    );
}

export default RenderInformation;