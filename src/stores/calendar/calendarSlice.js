import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        // memberList : {},
    },
    reducers: {
        // setMemberList(state, action) {
        //     state.memberList = action.payload;
        // },
    },
});

export const stateCalendar = (state) => state.calendar;
export const actionsCalendar = calendarSlice.actions;

export default calendarSlice.reducer;
