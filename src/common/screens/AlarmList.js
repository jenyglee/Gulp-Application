import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, SafeAreaView, ScrollView, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { icons } from "@/icons";
import { Button, Grade, Alarm } from "@components/index";
import { GradeTable, AlarmMenu } from "@components/modal/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signout } from "@/member/api/memberApi";
// import { showGradeTable } from "@/common/helper/helper"; // 등급보기 헬퍼
// import { signout, signConfirm } from "@/firebase";

const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    align-items: center;
    justify-content: center;
`;

const AddBtn = styled.Button`
    margin-bottom: 100px;
`;

const ProfileName = styled.Text`
    font-size: 18px;
`;

export default function AlarmList({ navigation }) {
    // ✨데이터형태(참고용)
    // const tempData = {
    //     1: {
    //         id: 1,
    //         alarm: "오후 8:30",
    //         name: {
    //             1: { id: 1, name: "오메가3", completed: false },
    //             2: { id: 2, name: "비타민", completed: false },
    //             3: { id: 3, name: "철분", completed: false },
    //         },
    //         day: [
    //             { id: 1, day: "월", check: "true" },
    //             { id: 2, day: "화", check: "true" },
    //         ],
    //         completed: false,
    //         showMenu : false  << 이걸 true로 바꿔주는 toggleTasks를 만들고, 이게 true가 되면 setAlarmMenu를 true로 바꿔주고, 변경을 누르면
    //     },
    const [selectedTaskKey, setSelectedTaskKey] = useState();
    const [tasks, setTasks] = useState({});
    const [count, setCount] = useState(0);
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    // 🪲 헬퍼를 뽑는 법을 모르겠음...
    // const bool = showGradeTable(false);

    const [alarmMenu, setAlarmMenu] = useState(false); // 알람 메뉴
    const [alarmMenuList, setAlarmMenuList] = useState([
        { id: 0, title: "알람 변경" },
        { id: 1, title: "지우기" },
        { id: 2, title: "닫기" },
    ]);
    const [foundMedicine, setFoundMedicine] = useState(false); // 약 리스트 유무
    const [isSignin, setIsSignin] = useState(true); // grade 노출(로그인시)

    // ✨ 로컬에 저장하기
    const storeData = async (tasks) => {
        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
            setTasks(tasks);
            // if (Object.values(tasks).length == 0) {
            //     setFoundMedicine(false);
            // } else {
            //     setFoundMedicine(true);
            // }
            confirmList(tasks);
        } catch (error) {
            throw error;
        }
    };

    // ✨로컬에서 가져오기
    const getData = async () => {
        const loadedData = await AsyncStorage.getItem("tasks");
        setTasks(JSON.parse(loadedData));
        // await confirmList(tasks);

        if (Object.values(JSON.parse(loadedData)).length == 0) {
            setFoundMedicine(false);
        } else {
            setFoundMedicine(true);
        }
    };

    // ✨ 약이 있는지 없는지 검사
    const confirmList = (list) => {
        if (Object.values(list).length == 0) {
            setFoundMedicine(false);
        } else {
            setFoundMedicine(true);
        }
    };

    // ✨(테스트용)복용완료
    const plusDate = () => {
        setCount(count + 1);
    };

    // ✨전체 완료 체크
    const toggleTask = (id) => {
        var copy = Object.assign({}, tasks);
        copy[id].completed = !copy[id].completed;
        storeData(copy);
        // setTasks(copy);
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
                    plusDate();
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
        setAlarmMenu(!alarmMenu);
        setSelectedTaskKey(id);
        const copy = Object.assign({}, tasks);
        return copy[id];
    };

    // ✨ 약 삭제
    const deleteTask = (id) => {
        const copy = Object.assign({}, tasks);
        delete copy[id];
        storeData(copy);
        setAlarmMenu(false);
    };

    // ✨ 알람 변경 페이지로 이동
    const editMedicine = () => {
        navigation.navigate("AddAlarm");
        setAlarmMenu(false);
    };

    // ✨ 로그인했는지 확인
    // ✨ 약 추가 후 메인으로 복귀
    useEffect(() => {
        // signConfirm();
        // confirmList(tasks);
        const removeFocusEvent = navigation.addListener("focus", () => {
            getData();
        });

        return () => {
            removeFocusEvent();
        };
    }, []);

    return (
        <ScrollView>
            <Container>
                <StatusBar style="auto" />
                {isSignin ? (
                    // 🪲 헬퍼를 뽑는 법을 모르겠음...
                    // <Grade count={count} onPress={showGradeTable(bool)} />
                    <Grade count={count} onPress={showGradeTable} />
                ) : (
                    <ProfileName>로그인해주세요</ProfileName>
                )}
                {foundMedicine ? (
                    Object.values(tasks).map((item) => {
                        return (
                            <Alarm
                                item={item}
                                checkIcon={
                                    item.completed ? icons.check : icons.uncheck
                                }
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

                <AddBtn
                    title="+추가하기"
                    onPress={() => {
                        navigation.navigate("AddAlarm");
                    }}
                />

                <View
                    style={{
                        marginTop: 50,
                    }}
                >
                    {/* <Button onPress={() => {}} title="(테스트용)메뉴" /> */}
                    <Button
                        onPress={() => {
                            navigation.navigate("Signin");
                        }}
                        title="(테스트용)로그인"
                    />
                    <Button onPress={signout} title="(테스트용)로그아웃" />
                    <Button onPress={plusDate} title="(테스트용)복용완료" />
                </View>
                {gradeTable ? (
                    // 🪲 헬퍼를 뽑는 법을 모르겠음...
                    // <GradeTable onPress={showGradeTable(bool)} />
                    <GradeTable onPress={showGradeTable} />
                ) : null}
                {alarmMenu ? (
                    <AlarmMenu
                        showAlarmMenu={showAlarmMenu}
                        deleteTask={deleteTask.bind(null, selectedTaskKey)}
                        alarmMenuList={alarmMenuList}
                        editMedicine={editMedicine}
                    />
                ) : null}
            </Container>
        </ScrollView>
    );
}
