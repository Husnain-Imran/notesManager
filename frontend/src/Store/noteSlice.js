import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "data",
  initialState: {
    note: null,
  },
  reducers: {
    setNote: (state, action) => {
      state.note = action.payload;
    },
    resetNote: (state) => {
      state.note = null;
    },
    removeNote: (state, action) => {
      state.note = state.note.filter((note) => note._id !== action.payload);
    },
  },
});
export const { setNote, resetNote,removeNote } = noteSlice.actions;
