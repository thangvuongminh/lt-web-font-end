import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "@store/authenticateSlice";
import profileReducer from "@store/profileSlice";
import blockContent from "@store/blocksSlice";
import blockActiveReducer from "@store/blockActiveSlice";
export const store = configureStore({
  reducer: {
    auth: authenticateReducer,
    profile: profileReducer,
    contentDetail: blockContent,
    blockActive: blockActiveReducer,
  },
});
