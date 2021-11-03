import { configureStore } from "@reduxjs/toolkit";
import alarmsReducer from "./alarms/alarmsSlice.js";

export default configureStore({
    reducer: {
        alarms: alarmsReducer,
    },
});
