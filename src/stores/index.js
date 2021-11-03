import { configureStore } from "@reduxjs/toolkit";
import alarmsReducer from "./alarms/alarmsSlice.js";
import ReduxThunk from "redux-thunk";

export default configureStore({
    reducer: {
        alarms: alarmsReducer,
    },
    middleware: [
        //middleware: 본래 함수(reducer)를 호출하기 전에 중간에 실행하는 함수를 만든다
        // async await를 먼저 불러온 후 reducer를 실행한다.
        ReduxThunk,
    ],
});
