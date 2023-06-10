import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/material';

const Ratings = ({ rating }) => {
  return (
    <Box>
      {[...Array(5).keys()].map((index) => (
        <StarIcon
          key={index}
          sx={{
            fontSize: '1rem',
            color: index < rating ? '#FCDD15' : 'grey',
          }}
        />
      ))}
    </Box>
  );
};

export default Ratings;

import React, { Fragment } from 'react';