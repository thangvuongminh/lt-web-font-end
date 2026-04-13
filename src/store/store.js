import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "@store/authenticateSlice";
export const store = configureStore({
  reducer: {
    auth: authenticateReducer,
  },
});
