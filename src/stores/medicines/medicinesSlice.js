import { createSlice } from "@reduxjs/toolkit";

export const alarmsSlice = createSlice({
    name: "alarms",
    initialState: {
        // alarms: [],
        // alarm: {
        //     name: "",
        //     age: "",
        // },
    },
    reducers: {
        // alarmSet: (state, action) => {
        //     state.alarm = action.payload;
        // },
        // alarmsCreate: (state, action) => {
        //     state.alarms.push(action.payload);
        // },
    },
});

export const stateAlarms = (state) => state.alarms;
export const actionsAlarms = alarmsSlice.actions;

export default alarmsSlice.reducer;
