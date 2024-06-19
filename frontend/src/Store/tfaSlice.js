import { createSlice } from "@reduxjs/toolkit";

export const tfaSlice = createSlice({
  name: "tfa",
  initialState: {
    verify: false,
  },
  reducers: {
    verify: (state) => {
      state.verify= true;
    },
    resetVerify:(state)=>{
        state.verify=false
    }
   
  },
});

export const {  verify, resetVerify} = tfaSlice.actions;
