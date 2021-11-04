import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
    name: "common",
    initialState: {
        weekAll : [{ id: 0, day: "All", checked: false }],
        week : [
            { id: 1, day: "월", checked: false },
            { id: 2, day: "화", checked: false },
            { id: 3, day: "수", checked: false },
            { id: 4, day: "목", checked: false },
            { id: 5, day: "금", checked: false },
            { id: 6, day: "토", checked: false },
            { id: 7, day: "일", checked: false },
        ],
        time: "",
    },
    reducers: {
        setTime(state,action){
            state.time = action.payload
        },
        setWeekAll(state,action){
            state.weekAll = action.payload
        },
        setWeek(state,action){
            state.week = action.payload
        }
    }
})

export const stateCommon = (state) => state.common;
export const actionsCommon = commonSlice.actions;

export default commonSlice.reducer;