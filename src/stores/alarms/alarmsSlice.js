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

        count: 0,
        countTotal: 0,
    },
    reducers: {
        setAlarms(state, action) {
            state.alarms = action.payload;
        },
        setFiltered(state, action) {
            state.filtered = action.payload;
        },
        setIsVisibleAlarm(state, action) {
            state.isVisibleAlarm = action.payload;
        },
        setCount(state, action) {
            state.count = action.payload;
        },
        setCountTotal(state, action) {
            state.countTotal = action.payload;
        },
    },
});

export const stateAlarms = (state) => state.alarms;
export const actionsAlarms = alarmsSlice.actions;

export default alarmsSlice.reducer;
