import { actionsAlarms } from "./alarmsSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import _ from 'lodash'

const actions = {
    // ✨ 알람 삭제(alarmList)
    deleteTask : ({selectedTaskKey, filtered, day }) => async (dispatch) => {
        try {
            const alarms = await (actions.deleteAlarm(selectedTaskKey))(dispatch)
            await (actions.storeData(alarms))(dispatch)
            await (actions.getAlarms({filtered, day}))(dispatch)
        } catch (error) {
            Alert.alert(error)
        }
    },

    // ✨ 알람토글(alarmList)
    toggleTask : ({id, filtered, day, year, month, date, count, countTotal, setIsVisibleCompleteModal}) => async (dispatch) => {
        try {
            const alarms = await (actions.toggleAlarm(id))(dispatch)
            await (actions.storeData(alarms))(dispatch);
            const filteredAlarms = await (actions.getAlarms({ filtered, day}))(dispatch);
            // console.log(filteredAlarms, "toggleTask 24");
            await (actions.allCompleted({ alarms: filteredAlarms, year, month, date, count, countTotal,setIsVisibleCompleteModal }))(dispatch);
        } catch (error) {
            Alert.alert(error)
        }
    },
    
    // ✨ 컴포넌트 삭제후 리턴(alarmList)
    deleteAlarm: ( selectedTaskKey ) => async (dispatch) => {
        try {
            const loadedData = await AsyncStorage.getItem("alarm");
            const parseData = JSON.parse(loadedData);
            const copy = Object.assign({}, parseData);
            delete copy[selectedTaskKey];
            return copy;
        } catch (error) {
            console.log(error)
        }
    },

        // ✨ 알람 불러오기(alarmList)
    getAlarms:({ filtered, day }) =>async (dispatch) => {
        try {
            const loadedData = await AsyncStorage.getItem("alarm");
            const parseData = JSON.parse(loadedData);
            const changedDay = day ? day : 7; //일요일을 0 👉 7 변환
            // true면 오늘의 요일만 ,  false면 전체요일
            const filteredAlarms = filtered
                ? Object.values(parseData)
                      .filter((alarm) => alarm.day.includes(changedDay))
                      .reduce((p, v) => ({ ...p, [v.id]: v }), {})
                : parseData;

                // console.log(filteredAlarms, "getAlarms");
            // 비교후에 아래진행 Lodash > _.isEqual
            // import _ from 'lodash';
            dispatch(actionsAlarms.setAlarms(filteredAlarms || []));
            return filteredAlarms
        } catch (error) {
            Alert.alert(error)
        }
    },
    // ✨ 알람이 아예 없는지 검사(alarmList)
    confirmList: ({alarms,setIsVisibleAlarm}) => async (dispatch) => {
        Object.values(alarms).length === 0
            ? setIsVisibleAlarm(false)
            : setIsVisibleAlarm(true)
    },

    // ✨완료용 컴포넌트로 변경(alarmList)
    toggleAlarm: (id) => async (dispatch) => {
        try {
            const loadedData = await AsyncStorage.getItem("alarm");
            const parseData = JSON.parse(loadedData);
            const copy = Object.assign({}, parseData);
            copy[id].completed = !copy[id].completed;
            return copy
        } catch (error) {
            Alert.alert(error)
        }
    },

    // ✨ 로컬에 저장하기(alarmList)
    storeData: (alarms) => async (dispatch) => {
        try {
            await AsyncStorage.setItem("alarm", JSON.stringify(alarms));
        } catch (error) {
            Alert.alert(error)
        }
    },

    // ✨전체 체크 시 복용일을 1일 증가(alarmList)
    allCompleted:({ alarms, year, month, date, count, countTotal,setIsVisibleCompleteModal }) =>async (dispatch) => {
            // 🪲 오늘의 알람만 눌러야 완료체크 되도록 해야함. 🪲
            let num = 0;

            for (let i = 0; i < Object.values(alarms).length; i++) {
                if (Object.values(alarms)[i].completed) {
                    num++;
                    if (num == Object.values(alarms).length) {
                        const loadedDate = await AsyncStorage.getItem("date");
                        const parseDate = JSON.parse(loadedDate);
                        const todayDate = `${year}-${month + 1}-${date}`; // "2021-11-10"
                        if (parseDate !== todayDate) {
                            // ✨복용완료 일수 증가
                            dispatch(
                                actionsAlarms.setCountTotal(countTotal + 1)
                            );
                            // ✨복용완료 게이지 14까지 되었을 시 초기화
                            if (count === 13) {
                                dispatch(actionsAlarms.setCount(0));
                            } else {
                                dispatch(actionsAlarms.setCount(count + 1));
                            }
                            // ✨복용완료 모달 노출
                            setIsVisibleCompleteModal(true);
                            await AsyncStorage.setItem("date", JSON.stringify(todayDate));
                            return;
                        } else {
                            return;
                        }
                    }
                }
            }
        },

    // ✨완료모달 닫기(alarmList)
    setIsVisibleCompleteModal : (payload) => (dispatch) => {
        dispatch(actionsAlarms.setIsVisibleCompleteModal(payload))
    },

     //  ✨빈칸검수(AddAlarm)
    confirmValue : (medicineList, time, week) => (dispatch) => {
        // ① 복용중인 영양제에 등록된 약이 있는지
        if (Object.values(medicineList).length != 0) {
            // ② 시간을 설정했는지
            if (time !== "") {
                // ③ 체크된 요일이 하나라도 존재하는지
                const result = week.some((item) => {
                    return item.checked;
                });
                if (result) {
                    // ①②③ 모두 통과 시 true 반환
                    return true;
                } else return false;
            } else return false;
        } else return false;
    },

    //  ✨ 알람 저장(AddAlarm)
    saveAlarm : (response, medicineList, time, week, weekCheckList, navigation) => async (dispatch) => {
        // 빈칸 검수(response)가 완료된 경우 저장 진행
        if (response) {
            const ID = Date.now();
            {
                // ⓵ 체크된 요일의 id만 가져와 빈 배열(weekCheckList)에 넣기
                week.map((checkedDay) => {
                    if (checkedDay.checked) {
                        weekCheckList.push(checkedDay.id);
                    }
                });
            }
            // ⓶ 채워진 배열을 변수화
            const newTask = {
                [ID]: {
                    id: ID,
                    time: time,
                    name: medicineList,
                    day: weekCheckList, // 숫자로 전달됨 ex) [2, 3]
                    completed: false,
                },
            };
            try {
                const value = await AsyncStorage.getItem("alarm");
                const alarm = JSON.parse(value);
                await AsyncStorage.setItem( "alarm", JSON.stringify({ ...alarm, ...newTask }) );
                navigation.navigate("AlarmList");
            } catch (error) {
                Alert.alert(error);
            }
        } else if (!response) {
            Alert.alert("설정이 전부 입력되었는지 확인해주세요.");
        }
    },
    changeSunday : (day) => (dispatch) =>{
        return day === 0 ? 7 : day;
        // if(todayNumber === 0) {
        //     return 7
        // } else {
        //     return todayNumber
        // }
    }
};

export default actions;
