import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userToken = action.payload.userToken;
    },

    setLogout: (state) => {
      state.userToken = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
