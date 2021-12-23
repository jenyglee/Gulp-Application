import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
    name: "common",
    initialState: {},
    reducers: {},
});

export const stateCommon = (state) => state.common;
export const actionsCommon = commonSlice.actions;

export default commonSlice.reducer;
