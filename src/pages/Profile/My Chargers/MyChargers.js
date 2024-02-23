import React, { Fragment } from 'react';
import { Typography } from '@mui/material';

const MyChargers = ({user, chargers}) => {
  console.log(chargers)
  return (
    <Fragment>
      <Typography variant='h4' sx={{width: { xs: "93vw", md: "41rem", lg: "50rem" }, color: '#fff',}}>My Chargers</Typography>
    </Fragment>
  );
};

export default MyChargers;