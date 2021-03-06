import { createSlice } from "@reduxjs/toolkit";

export const membersSlice = createSlice({
    name: "members",
    initialState: {
        token: "",
        nickname: "",
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        setNickname(state, action) {
            state.nickname = action.payload;
        },
    },
});

export const stateMembers = (state) => state.members;
export const actionsMembers = membersSlice.actions;

export default membersSlice.reducer;
