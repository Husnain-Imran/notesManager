import {configureStore} from '@reduxjs/toolkit';
import { authSlice} from './authSlice';
import { alertSlice} from './alertSlice';
import { noteSlice } from './noteSlice';
import { tfaSlice } from './tfaSlice';

export default configureStore({
    reducer: {
        auth:authSlice.reducer,
        alert:alertSlice.reducer,
        data:noteSlice.reducer,
        tfa:tfaSlice.reducer
    }
    });