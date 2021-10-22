import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { icons } from "@/icons";
import Button from "@components/Button";
import AlarmMenu from "@/common/components/modal/AlarmMenu";
import Grade from "@/common/screens/AlarmList/component/Grade";
import Alarm from "@/common/screens/AlarmList/component/Alarm";
import TopLogo from "@/common/screens/AlarmList/component/TopLogo";
import ButtonFilter from "@/common/screens/AlarmList/component/ButtonFilter";
import { GradeTable } from "@components/modal/index";
import CompleteModal from "@screens/AlarmList/component/CompleteModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signout } from "@/member/api/memberApi";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { showGradeTable } from "@/common/helper/helper"; // 등급보기 헬퍼
// import { signout, signConfirm } from "@/firebase";
import { FloatingAction } from "react-native-floating-action";

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

export default function AlarmList({ navigation }) {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const insets = useSafeAreaInsets();
    const [selectedTaskKey, setSelectedTaskKey] = useState();
    const [tasks, setTasks] = useState({});
    const [countTotal, setCountTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [menuVisible, setMenuVisible] = useState(false); // 알람메뉴 노출/숨김
    const [isVisibleComplete, setIsVisibleComplete] = useState(false); //전체복용 완료
    const [foundMedicine, setFoundMedicine] = useState(false); // 약 리스트 유무

    // ✨ 로그인했는지 확인 + 약 추가 후 메인으로 복귀
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getData();
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ 로컬에 저장하기
    const storeData = async (tasks) => {
        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
            setTasks(tasks);
            confirmList(tasks);
        } catch (error) {
            throw error;
        }
    };

    // ✨로컬에서 가져오기
    const getData = async () => {
        const loadedData = await AsyncStorage.getItem("tasks");
        const parseData = JSON.parse(loadedData);
        const result = await setAlarmCompleted(parseData);
        setTasks(result);

        // await confirmList(tasks);
        if (Object.values(JSON.parse(loadedData)).length == 0) {
            setFoundMedicine(false);
        } else {
            setFoundMedicine(true);
        }
    };

    // ✨ 새로고침 시 completed 꼬임 방지
    const setAlarmCompleted = async (data) => {
        const copy = Object.assign({}, data);
        // console.log(copy[1634727162582]);

        return data;
    };

    // ✨ 약이 있는지 없는지 검사
    const confirmList = (list) => {
        if (Object.values(list).length == 0) {
            setFoundMedicine(false);
        } else {
            setFoundMedicine(true);
        }
    };

    // ✨복용완료
    const completeAlarm = () => {
        setIsVisibleComplete(true);
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

    // ✨전체 완료 체크
    const toggleTask = (id) => {
        var copy = Object.assign({}, tasks);
        copy[id].completed = !copy[id].completed;
        storeData(copy);
        allCompleted();
    };

    // ✨전체 체크 시 복용일을 1일 증가
    const allCompleted = () => {
        // 🪲 하루에 한번만 떠야함 🪲
        var num = 0;

        for (let i = 0; i < Object.values(tasks).length; i++) {
            if (Object.values(tasks)[i].completed) {
                num++;
                if (num == Object.values(tasks).length) {
                    // 카운트 증가
                    plusDate();
                    plusDateMAX();
                    // 바텀시트 노출
                    completeAlarm();
                    return;
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
        setMenuVisible(true);
        setSelectedTaskKey(id);
    };

    // ✨ 약 삭제
    const deleteTask = (id) => {
        const copy = Object.assign({}, tasks);
        delete copy[id];
        storeData(copy);
        setMenuVisible(false);
    };

    // ✨ 알람 변경 페이지로 이동
    const editMedicine = async () => {
        navigation.navigate("AddAlarm");
        setMenuVisible(false);
    };

    // ✨ 알람 추가 페이지로 이동
    const goAddAlarm = async () => {
        await AsyncStorage.setItem("medicine", {});
        navigation.navigate("AddAlarm");
    };

    const [filtered, setFiltered] = useState(true);
    // ✨ 전체알람 < > 오늘알람
    const alarmFilter = (bool) => {
        // true : 오늘의 알람만 노출
        // false : 모든 알람 노출
        setFiltered(bool);
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
                        <ButtonFilter onPress={alarmFilter} />
                    </TitleContainer>
                    {foundMedicine ? (
                        Object.values(tasks).map((item) => {
                            return (
                                <Alarm
                                    alarmInfo={item}
                                    menuIcon={icons.dot}
                                    toggleTask={toggleTask}
                                    showAlarmMenu={showAlarmMenu}
                                    key={item.id}
                                    filtered={filtered}
                                />
                            );
                        })
                    ) : (
                        <ProfileName>약을 추가해주세요.</ProfileName>
                    )}

                    <View
                        style={{
                            marginTop: 50,
                        }}
                    >
                        <Button
                            onPress={() => {
                                navigation.navigate("Signin");
                            }}
                            containerStyle={{
                                backgroundColor: "#f0f0f0",
                            }}
                            textStyle={{
                                color: "#666",
                            }}
                            title="(테스트용)로그인"
                        />
                        <Button
                            onPress={signout}
                            containerStyle={{
                                backgroundColor: "#f0f0f0",
                            }}
                            textStyle={{
                                color: "#666",
                            }}
                            title="(테스트용)로그아웃"
                        />
                        <Button
                            onPress={() => {
                                plusDate();
                                plusDateMAX();
                            }}
                            containerStyle={{
                                backgroundColor: "#f0f0f0",
                            }}
                            textStyle={{
                                color: "#666",
                            }}
                            title="(테스트용)복용완료"
                        />
                        {/* <Button
                            onPress={today}
                            containerStyle={{
                                backgroundColor: "#f0f0f0",
                            }}
                            textStyle={{
                                color: "#666",
                            }}
                            title="(테스트용)오늘의 요일"
                        /> */}
                    </View>
                    {gradeTable ? (
                        // 🪲 헬퍼를 뽑는 법을 모르겠음...
                        // <GradeTable onPress={showGradeTable(bool)} />
                        <GradeTable onPress={showGradeTable} />
                    ) : null}

                    <AlarmMenu
                        menuVisible={menuVisible}
                        setMenuVisible={setMenuVisible}
                        deleteTask={deleteTask.bind(null, selectedTaskKey)}
                        editMedicine={editMedicine}
                    />
                    <CompleteModal
                        isVisible={isVisibleComplete}
                        setIsVisible={setIsVisibleComplete}
                        deleteTask={deleteTask.bind(null, selectedTaskKey)}
                        editMedicine={editMedicine}
                        count={count}
                    />
                </Container>
            </Wrap>
            <FloatingAction
                color="#27C47D"
                shadow={{
                    shadowOpacity: 0.1,
                    shadowOffset: {
                        width: 5,
                        height: 10,
                    },
                }}
                buttonSize={60}
                animated={true}
                showBackground={false}
                onPressMain={() => {
                    navigation.navigate("AddAlarm");
                }}
            />
        </>
    );
}
