import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import toast from 'react-hot-toast'
import {addReview} from '../../utils/auth/user';

const RatingFormPopup = ({ open, setOpen, user,chargerData }) => {
  const [value, setValue] = useState(null);
  const [suggestions, setSuggestions] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuggestionChange = (event) => {
    setSuggestions(event.target.value);
  };

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    try {
      await addReview(user.uid, chargerData.uid, suggestions, value);

      toast.success('Rating and review submitted successfully!');
  } catch (error) {
      console.error('Error adding rating and review:', error);
      toast.error('Failed to submit rating and review. Please try again later.');
  }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rate and Give Suggestions</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>
          <TextField
            label="Suggestions"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={suggestions}
            onChange={handleSuggestionChange}
            required
          />
          <Typography variant="caption" color="textSecondary">
            Note: Please rate the charger and provide your valuable suggestions.
          </Typography>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={handleClose} variant="outlined" color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingFormPopup;
