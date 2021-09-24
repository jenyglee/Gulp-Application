import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {
    DeleteButton,
    TimePicker,
    WeekButton,
    Button,
} from "@components/index";
import { BasicModal } from "@components/modal/index";
import { illust } from "@/images";

const Container = styled.View`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledForm = styled.View`
    width: 80%;
    margin: 20px;
`;
const StyledTitle = styled.Text`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const ButtonArea = styled.View`
    width: 100%;
    height: 40px;
    display: flex;
    flex-flow: column wrap;
`;

const AddMedicine = ({ navigation }) => {
    const allCheckWeek = [{ id: 0, day: "매일", checked: false }];
    const checkWeek = [
        // { id: 0, day: "매일", check: false },
        { id: 0, day: "월", checked: false },
        { id: 1, day: "화", checked: false },
        { id: 2, day: "수", checked: false },
        { id: 3, day: "목", checked: false },
        { id: 4, day: "금", checked: false },
        { id: 5, day: "토", checked: false },
        { id: 6, day: "일", checked: false },
    ];
    // const tempData = {
    //     1: { id: 1, name: "비타민c" },
    //     2: { id: 2, name: "철분" },
    //     3: { id: 3, name: "오메가3" },
    //     4: { id: 4, name: "아르기닌" },
    //     5: { id: 5, name: "고려은단" },
    // };
    const [weekAll, setWeekAll] = useState(allCheckWeek);
    const [week, setWeek] = useState(checkWeek);
    const [ampm, setAmpm] = useState("");
    const [time, setTime] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    // const [medicineList, setMedicineList] = useState(tempData);
    const [medicineList, setMedicineList] = useState({});

    // ✨로컬에 저장하기
    const storeData = async (tasks) => {
        try {
            await AsyncStorage.setItem("medicine", JSON.stringify(tasks));
            setTasks(tasks);
        } catch (error) {
            throw error;
        }
    };

    // ✨로컬에서 가져오기
    const getData = async () => {
        try {
            const loadedData = await AsyncStorage.getItem("medicine");
            setMedicineList(JSON.parse(loadedData));
            // return JSON.parse(loadedData);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getData();
        });
        return () => removeFocusEvent();
    }, []);

    // ✨ 약 삭제
    const deleteTask = (id) => {
        const copy = Object.assign({}, medicineList);
        delete copy[id];
        try {
            // await storeData(copy, "medicine");
            storeData(copy);
            setMedicineList(copy);
        } catch (error) {}
    };

    // ✨요일 전채선택
    const allWeekCheck = () => {
        const copyAllWeek = [...weekAll];
        const copyWeek = [...week];
        copyAllWeek[0].checked = !copyAllWeek[0].checked;
        {
            copyWeek.map((item) => {
                if (copyAllWeek[0].checked) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
        }
        setWeek(copyWeek);
        setWeekAll(copyAllWeek);
    };

    // ✨요일 개별선택
    const weekCheck = (id) => {
        var copy = [...week];
        copy[id].checked = !copy[id].checked;
        setWeek(copy);
    };

    // ✨ 설정한 시간 가져오기
    const whatTime = (ampm, time) => {
        if (ampm === "오전") {
            setAmpm("am");
        } else if (ampm === "오후") {
            setAmpm("pm");
        }
        setTime(time);
    };

    //  ✨빈칸체크
    const ConfirmValue = async (medicine, time, day) => {
        // console.log(time);
        if (Object.values(medicine).length != 0) {
            // console.log(typeof time);
            if (time !== "") {
                return true;
            } else return false;
        } else return false;
    };

    //  ✨ 알람 저장
    const saveMedicine = async () => {
        const bool = await ConfirmValue(medicineList, time, week); // 빈칸이 있는지 확인
        // console.log(bool);

        if (bool) {
            const ID = Date.now();
            let weekCheckList = []; // 체크된 요일

            {
                // ⓵ 체크된 요일만 가져와 빈 배열[]에 넣기
                week.map((checkedDay) => {
                    if (checkedDay.checked) {
                        weekCheckList.push(checkedDay);
                    }
                });
            }

            // ⓶ 채워진 배열을 변수화
            const newTask = {
                [ID]: {
                    id: ID,
                    ampm: ampm,
                    time: time,
                    name: medicineList,
                    day: weekCheckList,
                    completed: false,
                },
            };
            try {
                const value = await AsyncStorage.getItem("tasks");
                if (value !== null) {
                    const tasks = JSON.parse(value);
                    await AsyncStorage.setItem(
                        "tasks",
                        JSON.stringify({ ...tasks, ...newTask })
                    );
                    console.log(newTask);
                    navigation.navigate("AlarmList");
                }
                ``;
            } catch (error) {
                Alert.alert(error);
            }
        } else if (!bool) {
            setErrorModal(true);
        }
    };

    //  ✨ 에러모달 닫기
    const closeModal = () => {
        setErrorModal(false);
    };

    return (
        <Container>
            <StyledForm>
                <StyledTitle>복용중인 영양제</StyledTitle>
                {Object.values(medicineList).map((item) => {
                    return (
                        <DeleteButton
                            title={item.name}
                            id={item.id}
                            key={item.id}
                            deleteTask={deleteTask}
                        />
                    );
                })}
                <Button
                    title="+추가하기"
                    onPress={() => {
                        navigation.navigate("AddMedicine");
                    }}
                />
            </StyledForm>
            <StyledForm>
                <StyledTitle>복용 시간</StyledTitle>
                <TimePicker onPress={whatTime} />
            </StyledForm>
            <StyledForm>
                <StyledTitle>복용 요일</StyledTitle>
                <WeekButton
                    title={weekAll[0].day}
                    onPress={allWeekCheck}
                    checked={weekAll[0].checked}
                />
                <ButtonArea>
                    {week.map((item) => {
                        return (
                            <WeekButton
                                title={item.day}
                                id={item.id}
                                key={item.id}
                                onPress={weekCheck}
                                checked={item.checked}
                            />
                        );
                    })}
                </ButtonArea>
            </StyledForm>

            <Button
                title="확인용"
                onPress={() => {
                    console.log(ampm, time);
                }}
            />
            <Button title="저장하기" onPress={saveMedicine} />
            {errorModal ? (
                <BasicModal
                    title="설정이 전부 입력되었는지 확인해주세요."
                    visible={errorModal}
                    onPress={closeModal}
                    src={illust.error}
                />
            ) : null}
        </Container>
    );
};

export default AddMedicine;
