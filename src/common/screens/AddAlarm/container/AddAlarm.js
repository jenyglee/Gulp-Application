import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Dimensions } from "react-native";
import Button from "@components/Button";
import ButtonSmall from "@components/ButtonSmall";
import TagButtonContainer from "@/common/screens/AddAlarm/component/TagButtonContainer";
import TimePicker from "@/common/screens/AddAlarm/component/TimePicker";
import WeekButtonContainer from "@/common/screens/AddAlarm/component/WeekButtonContainer";
import { icons14px } from "@/icons";
import { ScrollView } from "react-native-gesture-handler";
import { inject, observer } from "mobx-react";
import { useSelector, useDispatch } from "react-redux";

import { stateAlarms } from "stores/alarms/alarmsSlice.js";
import actionsAlarms from "stores/alarms/alarmsActions.js";

import { stateMedicines } from "stores/medicines/medicinesSlice";
import actionsMedicines from "stores/medicines/medicineActions";

const koreanDaysArr = ["월", "화", "수", "목", "금", "토", "일"];

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

const AddAlarm = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const theme = useContext(ThemeContext);
    const { medicineList } = useSelector(stateMedicines);
    const { time, timeWithColon, changingAlarmId } = useSelector(stateAlarms);
    const [weekCheckList, setWeekCheckList] = useState(""); // 체크된 요일
    const [medicinesId, setMedicinesId] = useState([]);
    const [week, setWeek] = useState([
        { id: 1, day: "월", checked: false },
        { id: 2, day: "화", checked: false },
        { id: 3, day: "수", checked: false },
        { id: 4, day: "목", checked: false },
        { id: 5, day: "금", checked: false },
        { id: 6, day: "토", checked: false },
        { id: 7, day: "일", checked: false },
    ]);
    const [weekAll, setWeekAll] = useState([
        { id: 0, day: "All", checked: false },
    ]);

    useEffect(() => {
        // 알람 변경 시
        if (changingAlarmId) {
            dispatch(
                actionsAlarms.getOneAlarm(
                    route.params.alarmId,
                    setWeekCheckList,
                    koreanDaysArr,
                    week,
                    setWeek
                )
            );
        }
        // 알람 추가 시
        if (route.params.fromScreen === "AlarmList") {
            dispatch(actionsMedicines.deleteAllValue());
        }
    }, [route.params]);

    // 저장버튼 누르기(알람 추가 or 알람 변경)
    const handleSaveButtonPress = () => {
        // console.log(route.params.alarmId);
        // route.params.alarmId 를 저장소에 저장시키고, 그 값이 존재한다면 무조건 알람변경
        // AlarmList에서 AddAlarm으로 갈 때는 저장소 값을 없애줌.

        if (changingAlarmId) {
            // ✨ 알람 변경 하기
            // ① 체크된 요일 id 추출(ex. "234")
            const checkedDay = week.filter((day) => day.checked === true);
            const checkedDayId = checkedDay.map((checkedDay) => {
                return checkedDay.id;
            });
            const strCheckedDayId = checkedDayId.join().replace(/\,/g, "");

            // ② 등록된 영양제 id 추출(ex. [1, 4])
            const arrMedicineId = medicineList.map((medicine) => {
                return medicine.id;
            });
            dispatch(
                actionsAlarms.editAlarm(
                    changingAlarmId,
                    timeWithColon,
                    strCheckedDayId,
                    arrMedicineId,
                    navigation
                )
            );
        } else {
            // ✨ 알람 추가하기
            dispatch(
                actionsAlarms.addAlarm(
                    medicineList,
                    timeWithColon,
                    week,
                    weekCheckList,
                    setWeekCheckList,
                    medicinesId,
                    setMedicinesId,
                    navigation
                )
            );
        }
    };

    // ✨복용시간 선택
    const handleTimePickerPress = (time) => {
        dispatch(actionsAlarms.setTime(time));
    };

    // ✨ 복용중인 영양제 추가
    const handleTagButtonPress = () => {
        navigation.navigate("SearchMedicine");
    };

    return (
        <>
            <ScrollView>
                <Container width={width} height={height}>
                    <StyledForm>
                        <StyledTitle>복용시간</StyledTitle>
                        <TimePicker
                            onPress={(time) => handleTimePickerPress(time)}
                            getTime={time}
                        />
                    </StyledForm>
                    <StyledForm>
                        <StyledTitle>복용 요일</StyledTitle>
                        <WeekButtonContainer
                            weekAll={weekAll}
                            week={week}
                            setWeekAll={setWeekAll}
                            setWeek={setWeek}
                        />
                    </StyledForm>
                    <StyledForm>
                        <StyledTitle>복용중인 영양제</StyledTitle>
                        <StyledTagForm>
                            <TagButtonContainer />
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
                                onPress={handleTagButtonPress}
                            />
                        </StyledTagForm>
                    </StyledForm>
                </Container>
            </ScrollView>
            <Button title="저장하기" onPress={handleSaveButtonPress} />
        </>
    );
};

export default AddAlarm;
