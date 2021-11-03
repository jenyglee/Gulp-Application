import { actionsAlarms } from "./alarmsSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    // ✨ 전체알람 < > 오늘알람
    handlePressAlarmFilter: (payload) => (dispatch) => {
        dispatch(actionsAlarms.setFiltered(payload));
    },

    // ✨ 알람 삭제
    deleteTask:
        ({ selectedTaskKey, setIsVisibleMenu }) =>
        async (dispatch) => {
            try {
                // console.log(selectedTaskKey, isVisibleMenu);
                const loadedData = await AsyncStorage.getItem("alarm");
                const parseData = JSON.parse(loadedData);
                const copy = Object.assign({}, parseData);
                delete copy[selectedTaskKey];
                return copy;
            } catch (error) {
                throw error;
            }
        },

    // ✨ 로컬에 저장하기
    storeData: (alarms) => async (dispatch) => {
        try {
            await AsyncStorage.setItem("alarm", JSON.stringify(alarms));
            dispatch(actionsAlarms.setAlarms(alarms));
        } catch (error) {
            throw error;
        }
    },

    // ✨ 알람 불러오기
    getAlarms:
        ({ filtered, day }) =>
        async (dispatch) => {
            try {
                const loadedData = await AsyncStorage.getItem("alarm");
                const parseData = JSON.parse(loadedData);
                const changedDay = day ? day : 7; //일요일을 0 👉 7 변환

                // true면 오늘의 요일만 ,  false면 전체요일
                const alarm = filtered
                    ? Object.values(parseData)
                          .filter((alarm) => alarm.day.includes(changedDay))
                          .reduce((p, v) => ({ ...p, [v.id]: v }), {})
                    : parseData;

                dispatch(actionsAlarms.setAlarms(alarm || []));
            } catch (error) {
                throw error;
            }
        },

    // ✨ 알람이 아예 없는지 검사
    confirmList: (alarms) => async (dispatch) => {
        Object.values(alarms).length === 0
            ? dispatch(actionsAlarms.setIsVisibleAlarm(false))
            : dispatch(actionsAlarms.setIsVisibleAlarm(true));
    },

    // ✨복용완료
    toggleTask: (id) => async (dispatch) => {
        // 🪲 완료시 알람을 가져와서 변경해주는데 전체알람쪽이 사라진다.
        const loadedData = await AsyncStorage.getItem("alarm");
        const parseData = JSON.parse(loadedData);
        const copy = Object.assign({}, parseData);
        copy[id].completed = !copy[id].completed;
        return copy;

        // this.storeData(copy); // 로컬에 저장하기
        // this.allCompleted(); // 전체 복용했는지 확인
    },

    // ✨전체 체크 시 복용일을 1일 증가
    allCompleted:
        ({ alarms, year, month, date, count, countTotal }) =>
        async (dispatch) => {
            // 🪲 오늘의 알람만 눌러야 완료체크 되도록 해야함. 🪲
            let num = 0;

            for (let i = 0; i < Object.values(alarms).length; i++) {
                if (Object.values(alarms)[i].completed) {
                    num++;
                    if (num == Object.values(alarms).length) {
                        const loadedDate = await AsyncStorage.getItem("date");
                        const parseDate = JSON.parse(loadedDate);
                        const todayDate = `${year}-${month + 1}-${date}`; // "2021-10-25"
                        if (parseDate !== todayDate) {
                            dispatch(
                                actionsAlarms.setCountTotal(countTotal + 1)
                            );
                            if (count === 13) {
                                dispatch(actionsAlarms.setCount(0));
                            } else {
                                dispatch(actionsAlarms.setCount(count + 1));
                            }
                            // this.completeAlarm();
                            await AsyncStorage.setItem(
                                "date",
                                JSON.stringify(todayDate)
                            );
                            return;
                        } else {
                            return;
                        }
                    }
                }
            }
        },

    // ✨복용완료
    // plusDate: (countTotal) => (dispatch) => {
    //     // this.setCountTotal(this.countTotal + 1);
    //     dispatch(actionsAlarms.setCountTotal(countTotal + 1));
    // },

    // plusDateMAX: (count) => (dispatch) => {
    //     if (count === 13) {
    //         dispatch(actionsAlarms.setCount(0));
    //     } else {
    //         this.setCount(this.count + 1);
    //         dispatch(actionsAlarms.setCount(count + 1));
    //     }
    // },

    // // ✨복용완료
    // completeAlarm = () => {
    //     this.setIsVisibleCompleteModal(true);
    // };
};

export default actions;
