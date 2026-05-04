import { createSlice } from "@reduxjs/toolkit";

export const blockActive = createSlice({
  name: "blocksActive",
  initialState: {
    type: "CONTENT_BLOCK",
    title: "Please select content to study",
    idBlock: null,
    contentId: "",
  },
  reducers: {
    setBlockActive: (state, action) => {
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.idBlock = action.payload.blockActive;
    },
  },
});
export const { setBlockActive } = blockActive.actions;
export default blockActive.reducer;
