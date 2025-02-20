import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuthorized: (state, action) => {
      state.user = true;
      state.userData = action.payload;
    },
    userUnAuthorized: (state, action) => {
      state.user = false;
      state.userData = {};
    },
  },
});

export const { userAuthorized, userUnAuthorized } = userSlice.actions;

export default userSlice.reducer;
