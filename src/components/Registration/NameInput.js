import React, { Fragment } from 'react'
import { otpStyle } from '../../pages/auths/style';
import { Button, TextField, Typography } from '@mui/material';

const NameInput = ({ data, changeDataHandler }) => {

    return (
        <Fragment>
            <Typography style={{ textAlign: 'center', color: '#fff', }}>Enter Your Name.</Typography>
            <TextField sx={otpStyle.registerTextfieldStyle} onChange={changeDataHandler} required variant='outlined' type='text' label='Username' name='Name' value={data.Name} />
            <Button size='large' sx={{
                backgroundColor: '#ffdf00', color: '#262626', fontSize: '1rem', ':hover': {
                    backgroundColor: '#e1ad01'
                }
            }} type='submit' variant='contained'>Next</Button>
        </Fragment>
    )
}

export default NameInput;