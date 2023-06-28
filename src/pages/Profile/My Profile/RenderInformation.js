import React from "react";
import { Grid, TextField } from "@mui/material";

const RenderInformation = ({ field, label, value, isEditing, handleChange }) => (
  <Grid item xs={6} key={field} style={{ marginBottom: "30px" }}>
    <TextField
      label={label}
      variant="outlined"
      size="small"
      value={value}
      onChange={(e) => handleChange(field, e.target.value)}
      disabled={!isEditing}
    />
  </Grid>
);

export default RenderInformation;
