import { createSlice } from "@reduxjs/toolkit";

export const alarmsSlice = createSlice({
    name: "alarms",
    initialState: {
        alarms: [],
        time: "",
        timeOnlyNumber: "",
        // today.toLocaleDateString(); 참고해서 변수 줄이기
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
        setTime(state, action) {
            state.time = action.payload;
        },
        setTimeOnlyNumber(state, action) {
            state.timeOnlyNumber = action.payload;
        },
        setCount(state, action) {
            state.count = action.payload;
        },
        setCountTotal(state, action) {
            state.countTotal = action.payload;
        },
        setIsVisibleCompleteModal(state, action) {
            state.isVisibleCompleteModal = action.payload;
        },
        setDay(state, action) {
            state.day = action.payload;
        },
    },
});

export const stateAlarms = (state) => state.alarms;
export const actionsAlarms = alarmsSlice.actions;

export default alarmsSlice.reducer;
