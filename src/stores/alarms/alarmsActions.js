import { actionsAlarms } from "./alarmsSlice.js";
import { actionsMedicines } from "../medicines/medicinesSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    apiAddAlarm,
    apiEditAlarm,
    apiGetAlarm,
    apiGetAllAlarm,
    apiGetOneAlarm,
} from "@/common/api/alarmApi";
import { apiCompletedCount } from "@/member/api/memberApi.js";
import { Alert } from "react-native";
import _ from "lodash";

const actions = {
    // ✨ 알람 삭제(alarmList)
    deleteTask:
        ({ selectedTaskKey, filtered, day }) =>
        async (dispatch) => {
            try {
                const alarms = await actions.deleteAlarm(selectedTaskKey)(
                    dispatch
                );
                await actions.storeData(alarms)(dispatch);
                await actions.getAlarms({ filtered, day })(dispatch);
            } catch (error) {
                console.log(JSON.stringify(error));
            }
        },

    // ✨ 알람토글(alarmList)
    toggleAlarm:
        ({
            index,
            completed,
            setCompleted,
            setIsVisibleCompleteModal,
            year,
            month,
            date,
            count,
            countTotal,
        }) =>
        async (dispatch) => {
            try {
                const copy = [...completed];
                copy[index].completed = !copy[index].completed;
                setCompleted(copy);

                // 완료모달 노출
                const allCompleted = completed.every((item) => item.completed);
                if (allCompleted) {
                    // 🍎 api는 현재 response.data가 ""으로 나와서 현재는 가려둠
                    // const token = await AsyncStorage.getItem("token");
                    // const response = await apiCompletedCount(token);
                    // console.log(response);

                    const loadedDate = await AsyncStorage.getItem("date");
                    const parseDate = JSON.parse(loadedDate); // 이전에 완료한 날짜
                    const todayDate = `${year}-${month + 1}-${date}`; // "오늘 날짜"
                    // const todayDate = "2021-11-10" // 임시용
                    if (parseDate !== todayDate) {
                        dispatch(actionsAlarms.setCountTotal(countTotal + 1));
                        // ✨복용완료 게이지 14까지 되었을 시 초기화
                        if (count === 13) {
                            dispatch(actionsAlarms.setCount(0));
                        } else {
                            dispatch(actionsAlarms.setCount(count + 1));
                        }
                        await AsyncStorage.setItem(
                            "date",
                            JSON.stringify(todayDate)
                        );
                        setIsVisibleCompleteModal(true);
                        return;
                    } else {
                        return;
                    }
                } else return;
            } catch (error) {
                Alert.alert(JSON.stringify(error));
            }
        },

    // ✨ 컴포넌트 삭제후 리턴(alarmList)
    deleteAlarm: (selectedTaskKey) => async (dispatch) => {
        try {
            const loadedData = await AsyncStorage.getItem("alarm");
            const parseData = JSON.parse(loadedData);
            const copy = Object.assign({}, parseData);
            delete copy[selectedTaskKey];
            return copy;
        } catch (error) {
            console.log(error);
        }
    },

    // ✨ 알람 불러오기(alarmList)
    getAlarms: (day, setCompleted) => async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const changedDay = day ? day : 7; //일요일을 0 👉 7 변환
            const response = await apiGetAlarm(token, changedDay);
            dispatch(actionsAlarms.setAlarms(response.data));

            // 알람 수만큼 {completed:false} 생성하기
            const tempArr = [];
            response.data.map((alarm) => tempArr.push({ completed: false }));
            setCompleted(tempArr);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    // ✨ 알람 전체 불러오기(alarmList)
    getAllAlarms: (payload) => async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await apiGetAllAlarm(token);
            dispatch(actionsAlarms.setAlarms(response.data));
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    // ✨ 알람 단건 가져오기(알람 변경 시)
    getOneAlarm:
        (alarmId, setWeekCheckList, koreanDaysArr, week, setWeek) =>
        async (dispatch) => {
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await apiGetOneAlarm(token, alarmId); // api 데이터

                // ① 등록된 요일로 체크시키기
                // ex. ["1", "2", "3"] -> ["월", "화", "수"]
                const selectedKoreanDayArr = []; // 복용 요일 한글 배열(push용)
                const arrDayNum = response.data.day.split("");
                arrDayNum.map((item) => {
                    selectedKoreanDayArr.push(koreanDaysArr[item]);
                });

                // week 데이터에서 체크된 날짜 배열과 id가 같은 것을 {checked : true}로 변경
                const copyWeek = [...week]; // 복용 요일 카피본
                copyWeek.map((weekObj) => {
                    arrDayNum.map((num) => {
                        if (weekObj.id === Number(num)) {
                            weekObj.checked = !weekObj.checked;
                        }
                        setWeek(copyWeek);
                    });
                });
                setWeekCheckList(response.data.day);

                // ② 등록된 time 값 넣기
                const ampm = response.data.time[0] > 12 ? "오후" : "오전";
                const hour =
                    response.data.time[0] > 12
                        ? response.data.time[0] - 12
                        : response.data.time[0];
                const minute = response.data.time[1];
                await actions.setTime(`${ampm} ${hour}:${minute}`)(dispatch);

                // ③ time의 "00:00:00" 형태를 저장(알람변경 시 사용)
                // - 00초인 경우 빈 배열로 나오니(ex. [8, 30]) 이때 임의로 "10"를 추가한다.
                const newArrTime =
                    response.data.time.length === 3
                        ? response.data.time
                        : [...response.data.time, "10"]; // [8, 30, "10"]

                const strArrTime = [
                    String(newArrTime[0]),
                    String(newArrTime[1]),
                    newArrTime[2],
                ]; // ["8", "30", "10"]

                if (strArrTime[0].length) {
                    strArrTime[0] = "0" + strArrTime[0];
                } // ["08", "30", "10"]

                let formatArrToStr = "";
                strArrTime.map((item) => {
                    formatArrToStr += item;
                }); // "083010"

                const colonStrTime = `${formatArrToStr.slice(
                    0,
                    2
                )}:${formatArrToStr.slice(2, 4)}:${formatArrToStr.slice(4, 6)}`; // "08:30:10"
                await actions.setTimeWithColon(colonStrTime)(dispatch);

                // ③ 등록된 영양제 넣기
                dispatch(
                    actionsMedicines.setMedicineList(
                        response.data.alarmMedicines.map(({ medicine }) => ({
                            name: medicine.name,
                            brandName: medicine.brand.name,
                            id: medicine.id,
                        }))
                    )
                );
            } catch (error) {
                console.log(JSON.stringify(error));
            }
        },

    // ✨ 알람이 아예 없는지 검사(alarmList)
    confirmList:
        ({ alarms, setIsVisibleAlarm }) =>
        async (dispatch) => {
            Object.values(alarms).length === 0
                ? setIsVisibleAlarm(false)
                : setIsVisibleAlarm(true);
        },

    // ✨ 로컬에 저장하기(alarmList)
    storeData: (alarms) => async (dispatch) => {
        try {
            await AsyncStorage.setItem("alarm", JSON.stringify(alarms));
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    // ✨전체 체크 시 복용일을 1일 증가(alarmList)
    allCompleted:
        ({
            alarms,
            year,
            month,
            date,
            count,
            countTotal,
            setIsVisibleCompleteModal,
        }) =>
        async (dispatch) => {
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

    // ✨완료모달 닫기(alarmList)
    setIsVisibleCompleteModal: (payload) => (dispatch) => {
        dispatch(actionsAlarms.setIsVisibleCompleteModal(payload));
    },

    //  ✨빈칸검수(AddAlarm)
    confirmValue: (medicineList, time, week) => (dispatch) => {
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
    addAlarm:
        (
            medicineList,
            timeWithColon,
            week,
            weekCheckList,
            setWeekCheckList,
            medicinesId,
            setMedicinesId,
            navigation
        ) =>
        async (dispatch) => {
            // 초기화
            setWeekCheckList("");
            setMedicinesId([]);
            // ⓵ 빈칸검수
            const confirm = await actions.confirmValue(
                medicineList,
                timeWithColon,
                week
            )(dispatch);
            if (confirm) {
                // ②체크된 요일의 id만 가져와 빈 문자열(weekCheckList)에 넣기
                week.map((checkedDay) => {
                    if (checkedDay.checked) {
                        weekCheckList += checkedDay.id; // "456"
                    }
                });
                Object.values(medicineList).map((medicine) => {
                    medicinesId.push(medicine.id);
                });
                // ③ api 저장 진행
                const token = await AsyncStorage.getItem("token");
                const response = await apiAddAlarm(
                    {
                        time: timeWithColon,
                        day: weekCheckList,
                        medicineIdList: medicinesId,
                    },
                    token
                );
                console.log(response);
                if (response.status === 200) {
                    navigation.navigate("AlarmList");
                } else {
                    Alert.alert("생성오류");
                }
            } else if (!confirm) {
                Alert.alert("설정이 전부 입력되었는지 확인해주세요.");
            }
        },

    // ✨알람 변경
    editAlarm:
        (alarmId, time, checkedDay, medicineList, navigation) =>
        async (dispatch) => {
            const token = await AsyncStorage.getItem("token");
            const response = await apiEditAlarm({
                id: alarmId,
                time: time,
                day: checkedDay,
                medicineIdList: medicineList,
                token,
            });
            if (response.status === 200) {
                navigation.navigate("AlarmList");
            }
        },

    // ✨요일 전채선택(common)
    allWeekCheck:
        ({ week, setWeek, weekAll, setWeekAll }) =>
        (dispatch) => {
            const copyWeekAll = [...weekAll];
            const copyWeek = [...week];
            copyWeekAll[0].checked = !copyWeekAll[0].checked;
            {
                copyWeek.map((item) => {
                    if (weekAll[0].checked) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                });
            }
            setWeekAll(copyWeekAll);
            setWeek(copyWeek);
        },

    // ✨요일 개별선택
    weekCheck:
        ({ id, week, setWeek, weekAll, setWeekAll }) =>
        (dispatch) => {
            const copy = [...week];
            copy[id - 1].checked = !copy[id - 1].checked;
            // 체크 하나라도 빠지면 false
            const result = copy.every((item) => {
                return item.checked;
            });
            setWeekAll([{ id: 0, day: "All", checked: result }]);
        },

    setTime: (time) => (dispatch) => {
        dispatch(actionsAlarms.setTime(time));
    },
    setTimeWithColon: (time) => (dispatch) => {
        dispatch(actionsAlarms.setTimeWithColon(time));
    },
    setCompleted: (time) => (dispatch) => {
        dispatch(actionsAlarms.setCompleted(time));
    },
};

export default actions;
