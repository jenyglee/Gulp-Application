import { actionsAlarms } from "./alarmsSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    setFiltered: (payload) => async (dispatch) => {
        const loadedData = await AsyncStorage.getItem("alarm");
        const parseData = JSON.parse(loadedData);
        console.log(parseData);

        //     const copy = Object.assign({}, parseData);
        //     delete copy[id];
        //     this.storeData(copy);
        //     this.getAlarms(this.filtered);
        //     setIsVisibleMenu(false);

        dispatch(actionsAlarms.setFiltered(payload));
    },
    storeData: (payload) => async (dispatch) => {
        try {
            // await AsyncStorage.setItem("alarm", JSON.stringify(alarms));
            // confirmList(alarms); // 알람이 아예 없는지 검사
            // dispatch(actionsAlarms.setAlarm(payload));
        } catch (error) {
            throw error;
        }

        dispatch(actionsAlarms.deleteTask(payload));
    },
};

export default actions;
