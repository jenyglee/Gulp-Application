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
    const [alarm, setAlarm] = useState({});
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
            getData();
            setFiltered(true);
            // 어싱크스토리지("isCompleted")의 값이 false이면
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ Today <-> All 필터링 됐을 때
    useEffect(() => {
        getData();
    }, [filtered]);

    // ✨ 로컬에 저장하기
    const storeData = async (alarm) => {
        try {
            await AsyncStorage.setItem("alarm", JSON.stringify(alarm));
            setAlarm(alarm);
            confirmList(alarm);
        } catch (error) {
            throw error;
        }
    };

    // ✨로컬에서 가져오기
    const getData = async () => {
        try {
            const loadedData = await AsyncStorage.getItem("alarm");
            const parseData = JSON.parse(loadedData);
            const changedDay = day ? day : 7; //일요일을 0 👉 7 변환

            //🍎
            // true면 오늘의 요일만 ,  false면 전체요일
            const alarm = filtered
                ? Object.values(parseData)
                      .filter((alarm) => alarm.day.includes(changedDay))
                      .reduce((p, v) => ({ ...p, [v.id]: v }), {})
                : parseData;
            setAlarm(alarm);

            if (Object.values(JSON.parse(loadedData)).length == 0) {
                setIsVisibleAlarm(false);
            } else {
                setIsVisibleAlarm(true);
            }
        } catch (error) {
            throw error;
        }
    };

    // ✨ 약이 있는지 없는지 검사
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
        var copy = Object.assign({}, alarm);
        copy[id].completed = !copy[id].completed;
        setAlarm(copy);
        confirmList(copy);
        allCompleted();
    };

    // ✨전체 체크 시 복용일을 1일 증가
    const allCompleted = async () => {
        // 🪲 오늘의 알람만 눌러야 완료체크 되도록 해야함. 🪲
        let num = 0;
        for (let i = 0; i < Object.values(alarm).length; i++) {
            if (Object.values(alarm)[i].completed) {
                num++;
                if (num == Object.values(alarm).length) {
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
    const deleteTask = (id) => {
        const copy = Object.assign({}, alarm);
        delete copy[id];

        storeData(copy);
        setIsVisibleMenu(false);
    };

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
                        Object.values(alarm).map((item) => {
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
                        isVisibleMenu={isVisibleMenu}
                        setIsVisibleMenu={setIsVisibleMenu}
                        deleteTask={deleteTask.bind(null, selectedTaskKey)}
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
