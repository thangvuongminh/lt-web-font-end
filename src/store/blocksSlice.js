import { createSlice } from "@reduxjs/toolkit";

export const blockSlice = createSlice({
  name: "blocks",
  initialState: {
    byId: {},
  },
  reducers: {
    getDetailCourse: (state, action) => {
      const { id, blocks } = action.payload;
      state.byId[id] = {
        creatorId: action.payload.creatorId,
        ...blocks,
      };
    },
  },
});
export const { getDetailCourse } = blockSlice.actions;
export default blockSlice.reducer;
