import React from "react";
import { Grid, TextField } from "@mui/material";
import useStyles from "./styles";

export default function RenderInformation({
  field,
  label,
  value,
  isEditing,
  handleChange,
}) {
  const classes = useStyles();
  return (
    <Grid item xs={6} key={field} style={{ marginBottom: "30px" }}>
      <TextField
        label={label}
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        disabled={!isEditing}
        focused
        className={classes.textField}
      />
    </Grid>
  );
}
