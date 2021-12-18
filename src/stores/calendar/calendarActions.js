import { actionsCalendar } from "./calendarSlice";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    setSelectedDate: (payload) => async (dispatch) => {
        dispatch(actionsCalendar.setSelectedDate(payload));
    },
};

export default actions;
