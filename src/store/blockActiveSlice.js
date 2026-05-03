import { createSlice } from "@reduxjs/toolkit";

export const blockActive = createSlice({
  name: "blocksActive",
  initialState: {
    type: "",
    textContent: "",
    idBlock: null,
  },
  reducers: {
    setBlockActive: (state, action) => {
      state.type = action.payload.type;
      state.textContent = action.payload.textContent;
      state.idBlock = action.payload.blockActive;
    },
  },
});
export const { setBlockActive } = blockActive.actions;
export default blockActive.reducer;
