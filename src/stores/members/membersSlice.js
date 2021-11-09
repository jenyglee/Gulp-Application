import { createSlice } from "@reduxjs/toolkit";

export const memberSlice = createSlice({
    name: "member",
    initialState: {
        // memberList : {},
    },
    reducers: {
        // setMemberList(state, action) {
        //     state.memberList = action.payload;
        // },
    },
});

export const stateMembers = (state) => state.members;
export const actionsMembers = membersSlice.actions;

export default membersSlice.reducer;
