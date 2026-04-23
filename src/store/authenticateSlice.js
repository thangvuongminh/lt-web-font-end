import { getFieldRole } from "@/utils/systems/sysFuc";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: null,
  isAuthenticate: false,
  accessToken: null,
  roles: [],
};
export const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticate = true;
      state.accessToken = action.payload;
      const jwt = getFieldRole(state.accessToken);
      state.roles = jwt[0];
      state.id = jwt[1];
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticate = false;
    },
  },
});
export const { login, logout } = authenticateSlice.actions;
export default authenticateSlice.reducer;
