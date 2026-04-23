import { getFieldRole } from "@/utils/systems/sysFuc";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  nickname: null,
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profile: (state, payload) => {
      state.nickname = action.payload;
    },
  },
});
export const { profile } = profileSlice.actions;
export default profileSlice.reducer;
