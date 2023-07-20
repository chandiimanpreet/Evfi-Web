import React from 'react'
import { otpStyle } from './style';
import { Button, TextField, Typography } from '@mui/material';

export default function NameInput({ data, changeDataHandler }) {
    return (
        <>
            <Typography style={{ textAlign: 'center', color: '#fff', }}>Enter Your Name.</Typography>
            <TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} required variant='outlined' type='text' label='Username' name='username' value={data.username} />
            <Button size='large' sx={{backgroundColor: '#ffdf00',color:'#262626',fontSize:'1rem', ':hover': {
                    backgroundColor: '#e1ad01'
                }
            }} type='submit' variant='contained'>Next</Button>
        </>
    )
}
