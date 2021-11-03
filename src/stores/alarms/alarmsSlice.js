import { createSlice } from "@reduxjs/toolkit";

export const alarmsSlice = createSlice({
    name: "alarms",
    initialState: {
        alarms: [],

        filtered: true,
        isVisibleAlarm: true,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        day: new Date().getDay(),

        task: [],
    },
    reducers: {
        setAlarms(state, action) {
            state.alarms = action.payload;
        },
        storeData(state, action) {
            state.alarms = action.payload;
        },
        setFiltered(state, action) {
            state.filtered = action.payload;
        },
        setIsVisibleAlarm(state, action) {
            state.isVisibleAlarm = action.payload;
        },
    },
});

export const stateAlarms = (state) => state.alarms;
export const actionsAlarms = alarmsSlice.actions;

export default alarmsSlice.reducer;
