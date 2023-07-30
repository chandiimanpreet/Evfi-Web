import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        mobile: null,
        uid: null,
        username: null,
        registeredLevel1: false,
        isProvider: false,
        registeredLevel2: false,
        vehicleNo: null,
        chargerType: null,
        vehicleType: null,
    },
    reducers: {

    }
});

export const authActions = authSlice.actions;
export default authSlice;