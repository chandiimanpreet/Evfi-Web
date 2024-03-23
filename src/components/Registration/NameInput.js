import React, { Fragment, useState } from 'react';
import { otpStyle } from '../../pages/auths/style';
import { Button, TextField, Typography } from '@mui/material';

const NameInput = ({ onNameChange }) => {
    const [name, setName] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onNameChange(name);
    };

    return (
        <Fragment>
            <Typography style={{ textAlign: 'center', color: '#fff', }}>Enter Your Name.</Typography>
            <TextField
                sx={otpStyle.registerTextfieldStyle}
                required
                variant='outlined'
                type='text'
                label='Username'
                value={name}
                onChange={handleChange}
            />
            <Button
                size='large'
                sx={{
                    backgroundColor: '#ffdf00',
                    color: '#262626',
                    fontSize: '1rem',
                    ':hover': {
                        backgroundColor: '#e1ad01'
                    }
                }}
                type='submit'
                variant='contained'
                onClick={handleSubmit}
            >
                Next
            </Button>
        </Fragment>
    );
};

export default NameInput;
