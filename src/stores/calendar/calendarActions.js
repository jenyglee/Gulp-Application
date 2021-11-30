import { actionsCalendar } from "./calendarSlice";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    // ✨ 등록된 알람 가져오기
    getData: (setAlarm, setFoundMedicine) => async (dispatch) => {
        const loadedData = await AsyncStorage.getItem("alarm");
        const alarms = JSON.parse(loadedData);
        setAlarm(alarms);
        if (alarms !== null) {
            if (Object.values(alarms).length == 0) {
                setFoundMedicine(false);
            } else {
                setFoundMedicine(true);
            }
        } else return;
    },
};

export default actions;
