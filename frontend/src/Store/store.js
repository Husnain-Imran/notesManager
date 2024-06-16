import {configureStore} from '@reduxjs/toolkit';
import { authSlice} from './authSlice';
import { alertSlice} from './alertSlice';
export default configureStore({
    reducer: {
        auth:authSlice.reducer,
        alert:alertSlice.reducer
    }
    });