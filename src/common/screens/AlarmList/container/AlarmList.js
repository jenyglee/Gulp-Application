import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { icons } from "@/icons";
import AlarmMenu from "@/common/components/modal/AlarmMenu";
import Grade from "@/common/screens/AlarmList/component/Grade";
import Alarm from "@/common/screens/AlarmList/component/Alarm";
import TopLogo from "@/common/screens/AlarmList/component/TopLogo";
import ButtonFilter from "@/common/screens/AlarmList/component/ButtonFilter";
import { GradeTable } from "@components/modal/index";
import CompleteModal from "@screens/AlarmList/component/CompleteModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";
import { inject, observer } from "mobx-react";

const Wrap = styled.ScrollView`
    padding-top: ${({ insets }) => insets.top}px;
    padding-bottom: ${({ insets }) => insets.bottom}px;
`;

const Container = styled.View`
    flex: 1;
    width: ${({ width }) => width - 48}px;
    background-color: ${({ theme }) => theme.background};
    align-self: center;
    justify-content: center;
    margin-bottom: 50px;
`;

const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
`;

const StyledText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.textBasic};
`;

const ProfileName = styled.Text`
    font-size: 18px;
`;
// ✨데이터형태(참고용)

// const tempData = {
//     1: {
//         id: 1,
//         time: "08:30:20",
//         name: {
//             1: { id: 1, name: "오메가3", completed: false },
//             2: { id: 2, name: "비타민", completed: false },
//             3: { id: 3, name: "철분", completed: false },
//         },
//         day: [1, 2],
//         completed: false,
//     },

const AlarmList = ({ navigation, alarmsStore }) => {
    // console.log(alarmsStore);
    const { alarms, setAlarm, storeData, deleteTask } = alarmsStore;
    // const deleteTask = alarmsStore.deleteTask;

    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const insets = useSafeAreaInsets();
    const [selectedTaskKey, setSelectedTaskKey] = useState();
    // const [alarm, setAlarm] = useState({});
    const [countTotal, setCountTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [taskTotal, setTaskTotal] = useState(0);
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [isVisibleMenu, setIsVisibleMenu] = useState(false); // 알람메뉴 노출/숨김
    const [isVisibleCompleteModal, setIsVisibleCompleteModal] = useState(false); //전체복용 완료
    const [isVisibleAlarm, setIsVisibleAlarm] = useState(false); // 약 리스트 유무
    const [filtered, setFiltered] = useState(true); // Today <-> All 필터링
    const globalDate = new Date();
    const year = globalDate.getFullYear();
    const month = globalDate.getMonth();
    const date = globalDate.getDate();
    const day = globalDate.getDay(); // 0 : 일요일

    // ✨ 로그인했는지 확인 + 약 추가 후 메인으로 복귀
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            // getData();
            setFiltered(true);
            // 어싱크스토리지("isCompleted")의 값이 false이면
            alarmsStore.getAlarms({ setIsVisibleAlarm, filtered });
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ Today <-> All 필터링 됐을 때
    useEffect(() => {
        // getData();
        alarmsStore.getAlarms({ filtered });
    }, [filtered]);

    // ✨ 로컬에 저장하기
    // const storeData = async (alarm) => {
    //     try {
    //         await AsyncStorage.setItem("alarm", JSON.stringify(alarm));
    //         setAlarm(alarm);
    //         confirmList(alarm); // 알람이 아예 없는지 검사
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // ✨로컬에서 가져오기
    // const getData = async () => {
    //     try {
    //         const loadedData = await AsyncStorage.getItem("alarm");
    //         const parseData = JSON.parse(loadedData);
    //         const changedDay = day ? day : 7; //일요일을 0 👉 7 변환

    //         //🍎
    //         // true면 오늘의 요일만 ,  false면 전체요일
    //         const alarm = filtered
    //             ? Object.values(parseData)
    //                   .filter((alarm) => alarm.day.includes(changedDay))
    //                   .reduce((p, v) => ({ ...p, [v.id]: v }), {})
    //             : parseData;
    //         setAlarm(alarm);

    //         if (Object.values(JSON.parse(loadedData)).length == 0) {
    //             setIsVisibleAlarm(false);
    //         } else {
    //             setIsVisibleAlarm(true);
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // ✨ 알람이 아예 없는지 검사
    const confirmList = (list) => {
        if (Object.values(list).length == 0) {
            setIsVisibleAlarm(false);
        } else {
            setIsVisibleAlarm(true);
        }
    };

    // ✨복용완료
    const completeAlarm = () => {
        setIsVisibleCompleteModal(true);
    };

    // ✨(테스트용)복용완료
    const plusDate = () => {
        setCountTotal(countTotal + 1);
    };

    const plusDateMAX = () => {
        if (count === 13) {
            setCount(0);
        } else {
            setCount(count + 1);
        }
    };

    // ✨복용완료
    const toggleTask = (id) => {
        // 🪲 완료시 알람을 가져와서 변경해주는데 전체알람쪽이 사라진다.
        var copy = Object.assign({}, alarms);
        copy[id].completed = !copy[id].completed;
        storeData(copy); // 로컬에 저장하기
        allCompleted(); // 전체 복용했는지 확인
    };

    // ✨전체 체크 시 복용일을 1일 증가
    const allCompleted = async () => {
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
                        // console.log(parseDate, todayDate);
                        plusDate();
                        plusDateMAX();
                        completeAlarm();
                        await AsyncStorage.setItem(
                            "date",
                            JSON.stringify(todayDate)
                        );
                        return;
                    } else {
                        // console.log(parseDate, todayDate);
                        return;
                    }
                }
            }
        }
    };

    // ✨ 등급표 노출/숨김
    const showGradeTable = () => {
        setGradeTable(!gradeTable);
    };

    //  ✨알람메뉴 노출/숨김
    const showAlarmMenu = (id) => {
        setIsVisibleMenu(true);
        setSelectedTaskKey(id);
    };

    // ✨ 약 삭제
    // const deleteTask = (id) => {
    //     const copy = Object.assign({}, alarm);
    //     delete copy[id];

    //     storeData(copy);
    //     setIsVisibleMenu(false);
    // };

    // ✨ 알람 변경 페이지로 이동
    const editMedicine = (id) => {
        // 🍎
        navigation.navigate("AddAlarm", {
            alarmId: id,
        });
        setIsVisibleMenu(false);
    };

    // ✨ 알람 추가 페이지로 이동
    const goAddAlarm = async () => {
        await AsyncStorage.setItem("medicine", {});
        navigation.navigate("AddAlarm");
    };

    // ✨ 전체알람 < > 오늘알람
    const handlePressAlarmFilter = () => {
        // true : 오늘의 알람만 노출
        // false : 모든 알람 노출
        setFiltered((filtered) => !filtered);
    };

    return (
        <>
            <Wrap insets={insets}>
                <Container width={width}>
                    <StatusBar style="auto" />
                    <TopLogo />
                    <Grade
                        countTotal={countTotal}
                        count={count}
                        onPress={showGradeTable}
                    />
                    <TitleContainer>
                        <StyledText>내 알람</StyledText>
                        <ButtonFilter
                            filtered={filtered}
                            onPress={handlePressAlarmFilter}
                        />
                    </TitleContainer>
                    {isVisibleAlarm ? (
                        Object.values(alarms).map((item) => {
                            return (
                                <Alarm
                                    alarmInfo={item}
                                    menuIcon={icons.dot}
                                    toggleTask={toggleTask}
                                    showAlarmMenu={showAlarmMenu}
                                    key={item.id}
                                />
                            );
                        })
                    ) : (
                        <ProfileName>약을 추가해주세요.</ProfileName>
                    )}

                    {gradeTable ? (
                        // 🪲 헬퍼를 뽑는 법을 모르겠음...
                        // <GradeTable onPress={showGradeTable(bool)} />
                        <GradeTable onPress={showGradeTable} />
                    ) : null}

                    <AlarmMenu
                        isVisibleMenu={isVisibleMenu}
                        setIsVisibleMenu={setIsVisibleMenu}
                        deleteTask={deleteTask.bind(
                            null,
                            selectedTaskKey,
                            setIsVisibleMenu
                        )}
                        editMedicine={editMedicine.bind(
                            undefined,
                            selectedTaskKey
                        )}
                    />
                    <CompleteModal
                        isVisible={isVisibleCompleteModal}
                        setIsVisible={setIsVisibleCompleteModal}
                        count={count}
                    />
                </Container>
            </Wrap>
            <FloatingAction
                color="#27C47D"
                shadow={{
                    shadowOpacity: 0,
                    shadowOffset: {
                        width: 5,
                        height: 10,
                    },
                }}
                buttonSize={50}
                animated={false}
                showBackground={false}
                onPressMain={() => {
                    navigation.navigate("AddAlarm");
                }}
            />
        </>
    );
};

// export default inject("alarmsStore")(observer(AlarmList));
export default inject("alarmsStore")(observer(AlarmList));
