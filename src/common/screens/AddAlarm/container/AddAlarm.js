import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Dimensions } from "react-native";
import Button from "@components/Button";
import ButtonSmall from "@components/ButtonSmall";
import TagButton from "@/common/screens/AddAlarm/component/TagButton";
import TimePicker from "@/common/screens/AddAlarm/component/TimePicker";
import WeekButton from "@/common/screens/AddAlarm/component/WeekButton";
import { icons14px } from "@/icons";
import { ScrollView } from "react-native-gesture-handler";
import { deleteMedicine } from "@/medicine/api/medicineApi";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    margin-top: 50px;
    align-self: center;
`;

const StyledForm = styled.View`
    width: 100%;
    margin-bottom: 36px;
`;

const StyledTagForm = styled.View`
    flex-flow: row wrap;
`;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const WeekButtonContainer = styled.View`
    height: 60px;
    flex-direction: row;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
`;

const ButtonArea = styled.View`
    width: ${({ width }) => width - 48}px;
    align-self: center;
    bottom: 40px;
`;

const AddMedicine = ({ navigation, route }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const theme = useContext(ThemeContext);
    const allCheckWeek = [{ id: 0, day: "All", checked: false }];
    const checkWeek = [
        { id: 1, day: "월", checked: false },
        { id: 2, day: "화", checked: false },
        { id: 3, day: "수", checked: false },
        { id: 4, day: "목", checked: false },
        { id: 5, day: "금", checked: false },
        { id: 6, day: "토", checked: false },
        { id: 7, day: "일", checked: false },
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
    const weekCheckList = []; // 체크된 요일
    const [time, setTime] = useState("");
    const [medicineList, setMedicineList] = useState({});
    // const [medicineList, setMedicineList] = useState(tempData);

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            // 🍎 알람변경 시 등록된 알람 정보 가져와서 넣어주기
            // const alarmId = route.params?.alarmId;
            // getData(alarmId);
            getData();
        });
        return () => removeFocusEvent();
    }, []);

    // ✨로컬에서 약 가져오기
    const getData = async () => {
        try {
            // const alarm = await AsyncStorage.getItem("alarm");
            const loadedData = await AsyncStorage.getItem("medicine");
            setMedicineList(JSON.parse(loadedData));
        } catch (error) {
            throw error;
        }
    };

    // ✨ 약 삭제
    const deleteTask = async (id) => {
        const copy = Object.assign({}, medicineList);
        delete copy[id];
        try {
            // await storeData(copy, "medicine");
            storeData(copy);
            setMedicineList(copy);
        } catch (error) {}
    };

    // ✨ 약을 삭제하고 나면 "medicine"로컬에 다시 저장
    const storeData = async (item) => {
        try {
            await AsyncStorage.setItem("medicine", JSON.stringify(item));
        } catch (error) {
            throw error;
        }
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
        copy[id - 1].checked = !copy[id - 1].checked;

        const result = copy.every((item) => {
            return item.checked;
        });
        setWeekAll([{ id: 0, day: "All", checked: result }]);
        setWeek(copy);
    };

    // ✨ 설정한 시간 가져오기
    const whatTime = (date) => {
        setTime(date);
    };

    //  ✨빈칸체크
    const ConfirmValue = async (medicine, time, day) => {
        // ① 복용중인 영양제에 등록된 약이 있는지
        if (Object.values(medicine).length != 0) {
            // ② 시간을 설정했는지
            if (time !== "") {
                // ③ 체크된 요일이 하나라도 존재하는지
                const result = day.some((item) => {
                    return item.checked;
                });
                if (result) {
                    // ①②③ 모두 통과 시 true 반환
                    return true;
                } else return false;
            } else return false;
        } else return false;
    };

    //  ✨ 알람 저장
    const saveMedicine = async () => {
        // 빈칸 검수
        const confirmed = await ConfirmValue(medicineList, time, week);

        // 빈칸 검수가 완료된 경우 저장 진행
        if (confirmed) {
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
                // if (value !== null) {
                // }
                const alarm = JSON.parse(value);
                await AsyncStorage.setItem(
                    "alarm",
                    JSON.stringify({ ...alarm, ...newTask })
                );
                // console.log(newTask);
                navigation.navigate("AlarmList");
            } catch (error) {
                Alert.alert(error);
            }
        } else if (!confirmed) {
            Alert.alert("설정이 전부 입력되었는지 확인해주세요.");
        }
    };

    return (
        <>
            <ScrollView>
                <Container width={width} height={height}>
                    <StyledForm>
                        <StyledTitle>복용시간</StyledTitle>
                        <TimePicker onPress={whatTime} />
                    </StyledForm>
                    <StyledForm>
                        <StyledTitle>복용 요일</StyledTitle>
                        <WeekButtonContainer>
                            <WeekButton
                                title={weekAll[0].day}
                                onPress={allWeekCheck}
                                checked={weekAll[0].checked}
                            />
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
                        </WeekButtonContainer>
                    </StyledForm>
                    <StyledForm>
                        <StyledTitle>복용중인 영양제</StyledTitle>
                        <StyledTagForm>
                            {Object.values(medicineList).map((item) => {
                                return (
                                    <TagButton
                                        name={item.name}
                                        brand={item.brand}
                                        id={item.id}
                                        key={item.id}
                                        deleteTask={deleteTask}
                                    />
                                );
                            })}
                        </StyledTagForm>
                        <StyledTagForm>
                            <ButtonSmall
                                icon={icons14px.plus}
                                title="추가하기"
                                containerStyle={{
                                    backgroundColor: theme.white,
                                    borderWidth: 2,
                                    borderColor: theme.main,
                                }}
                                textStyle={{
                                    color: theme.main,
                                }}
                                onPress={() => {
                                    navigation.navigate("AddMedicine");
                                }}
                            />
                        </StyledTagForm>
                    </StyledForm>
                </Container>
            </ScrollView>
            <ButtonArea width={width}>
                <Button title="저장하기" onPress={saveMedicine} />
            </ButtonArea>
        </>
    );
};

export default AddMedicine;
