import { actionsAlarms } from "./alarmsSlice.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAlarm, getAlarm, getAlarmObj } from "@/common/api/alarmApi";
import { Alert } from "react-native";
import { stateCommon } from "stores/common/commonSlice";
import actionsCommon from "stores/common/commonActions";
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
    toggleTask:
        ({
            id,
            filtered,
            day,
            year,
            month,
            date,
            count,
            countTotal,
            setIsVisibleCompleteModal,
        }) =>
        async (dispatch) => {
            try {
                const alarms = await actions.toggleAlarm(id)(dispatch);
                await actions.storeData(alarms)(dispatch);
                const filteredAlarms = await actions.getAlarms({
                    filtered,
                    day,
                })(dispatch);
                // console.log(filteredAlarms, "toggleTask 24");
                await actions.allCompleted({
                    alarms: filteredAlarms,
                    year,
                    month,
                    date,
                    count,
                    countTotal,
                    setIsVisibleCompleteModal,
                })(dispatch);
            } catch (error) {
                // 🍎
                // Alert.alert(JSON.stringify(error));
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

    // // ✨ 알람 불러오기(alarmList) 'storage 전용'
    // getAlarms:
    //     ({ filtered, day }) =>
    //     async (dispatch) => {
    //         try {
    //             const loadedData = await AsyncStorage.getItem("alarm");
    //             const parseData = JSON.parse(loadedData);

    //             const changedDay = day ? day : 7; //일요일을 0 👉 7 변환
    //             // true면 오늘의 요일만 ,  false면 전체요일
    //             const filteredAlarms = filtered
    //                 ? Object.values(parseData)
    //                       .filter((alarm) => alarm.day.includes(changedDay))
    //                       .reduce((p, v) => ({ ...p, [v.id]: v }), {})
    //                 : parseData;

    //             dispatch(actionsAlarms.setAlarms(filteredAlarms || []));
    //             return filteredAlarms;

    //             // 비교후에 아래진행 Lodash > _.isEqual
    //             // import _ from 'lodash';
    //         } catch (error) {
    //             // 🍎
    //             console.log(error);
    //         }
    //     },

    // ✨ 알람 불러오기(alarmList) 'api 전용'
    getAlarms: (day) => async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const changedDay = day ? day : 7; //일요일을 0 👉 7 변환
            const response = await getAlarm(token, changedDay);
            dispatch(actionsAlarms.setAlarms(response.data));
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    // ✨ 알람 단건 가져오기(알람 변경 시)
    getAlarmObj:
        (alarmId, setWeekCheckList, koreanDaysArr, week, setWeek) =>
        async (dispatch) => {
            try {
                // console.log("alarmId : " + alarmId);
                const token = await AsyncStorage.getItem("token");
                const response = await getAlarmObj(token, alarmId);
                const arrDayNum = response.data.day.split(""); // 복용 요일 숫자 배열
                const selectedKoreanDayArr = []; // 복용 요일 한글 배열(push용)
                const copyWeek = [...week]; // 복용 요일 카피본
                const loadedData = await AsyncStorage.getItem("medicine");
                const medicines = JSON.parse(loadedData);
                // console.log(
                //     // koreanDaysArr
                //     // response.data.time,
                //     // response.data.day //"456"
                //     "오브젝트 id : ",
                //     response.data.alarmMedicines[0].id,
                //     "카테고리 : ",
                //     response.data.alarmMedicines[0].medicine.category,
                //     "브랜드 : ",
                //     response.data.alarmMedicines[0].medicine.brand,
                //     "이름 : ",
                //     response.data.alarmMedicines[0].medicine.name,
                //     "약 id : ",
                //     response.data.alarmMedicines[0].medicine.id
                //     // "스토레이지 약",
                //     // JSON.parse(loadedData)
                // );

                // 복용요일(숫자배열)이 한글로 바뀌면서 배열에 들어감
                arrDayNum.map((item) => {
                    selectedKoreanDayArr.push(koreanDaysArr[item]);
                });

                // 전체요일의 id와 복용요일(숫자)이 같을 때 해당 요일 체크시키기
                copyWeek.map((weekObj) => {
                    arrDayNum.map((num) => {
                        if (weekObj.id === Number(num)) {
                            weekObj.checked = !weekObj.checked;
                        }
                        setWeek(copyWeek);
                    });
                });
                // Object {
                //     "1": Object {
                //       "brandName": "종근당건강",
                //       "id": 1,
                //       "name": "알티지 오메가3",
                //     },
                //   }

                // 필요한것 : 오브젝트 id, 약의 id, 약 이름, 약 브랜드

                // console.log(selectedKoreanDayArr); //['금','토','일']

                await actions.setTime(
                    `${response.data.time[0]}:${response.data.time[1]}:${response.data.time[2]}`
                )(dispatch);

                const newMedicine = {
                    [response.data.alarmMedicines[0].medicine.id]: {
                        id: response.data.alarmMedicines[0].medicine.id,
                        name: response.data.alarmMedicines[0].medicine.name,
                        brandName:
                            response.data.alarmMedicines[0].medicine.brand.name,
                    },
                };
                // console.log("변경에서 온 약 : ", newMedicine);
                await AsyncStorage.setItem(
                    "medicine",
                    JSON.stringify({ ...newMedicine })
                );
                setWeekCheckList(response.data.day);
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

    // ✨완료용 컴포넌트로 변경(alarmList)
    toggleAlarm: (id) => async (dispatch) => {
        try {
            const loadedData = await AsyncStorage.getItem("alarm");
            const parseData = JSON.parse(loadedData);
            const copy = Object.assign({}, parseData);
            copy[id].completed = !copy[id].completed;
            return copy;
        } catch (error) {
            console.log(JSON.stringify(error));
        }
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
    saveAlarm:
        (
            medicineList,
            time,
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
                time,
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

                const token = await AsyncStorage.getItem("token");
                const response = await addAlarm(
                    {
                        time: time,
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
};

export default actions;
