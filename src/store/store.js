import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "@store/authenticateSlice";
import profileReducer from "@store/profileSlice";
export const store = configureStore({
  reducer: {
    auth: authenticateReducer,
    profile: profileReducer,
  },
});
