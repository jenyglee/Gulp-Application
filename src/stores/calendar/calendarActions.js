import { actionsCalendar } from "./calendarSlice";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    // ✨ 등록된 알람 가져오기
    getData : (setAlarm, setFoundMedicine) => async (dispatch) => {
        const loadedData = await AsyncStorage.getItem("alarm");
        setAlarm(JSON.parse(loadedData));

        if (Object.values(JSON.parse(loadedData)).length == 0) {
            setFoundMedicine(false);
        } else {
            setFoundMedicine(true);
        }
    }
}

export default actions;
