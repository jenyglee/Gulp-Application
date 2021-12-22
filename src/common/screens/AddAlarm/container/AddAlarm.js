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

const AddMedicine = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const theme = useContext(ThemeContext);

    const { medicineList } = useSelector(stateMedicines);
    const time = useSelector(stateAlarms).time;

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
    const [weekCheckList, setWeekCheckList] = useState(""); // 체크된 요일
    const [medicinesId, setMedicinesId] = useState([]);

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            dispatch(actionsMedicines.getMedicine());
        });
        return () => removeFocusEvent();
    }, []);

    useEffect(() => {
        // 알람 변경 시
        // 한글변환작업은 여기서
        // 요일 데이터는 스토어에 정리
        if (route.params.alarmId) {
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

    return (
        <>
            <ScrollView>
                <Container width={width} height={height}>
                    <StyledForm>
                        <StyledTitle>복용시간</StyledTitle>
                        <TimePicker
                            onPress={(time) => {
                                dispatch(actionsAlarms.setTime(time));
                            }}
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
                                onPress={() => {
                                    navigation.navigate("SearchMedicine");
                                }}
                            />
                        </StyledTagForm>
                    </StyledForm>
                </Container>
            </ScrollView>
            <Button
                title="저장하기"
                onPress={() => {
                    if (route.params.alarmId) {
                        // ✨ 알람 변경 하기
                        dispatch(
                            actionsAlarms.editAlarm(
                                route.params.alarmId,
                                time,
                                week,
                                medicineList
                            )
                            // medicineList,
                            // time,
                            // week,
                            // weekCheckList,
                            // setWeekCheckList,
                            // medicinesId,
                            // setMedicinesId,
                            // navigation
                        );
                    } else if (route.params.fromScreen) {
                        // ✨ 알람 추가하기
                        dispatch(
                            actionsAlarms.addAlarm(
                                medicineList,
                                time,
                                week,
                                weekCheckList,
                                setWeekCheckList,
                                medicinesId,
                                setMedicinesId,
                                navigation
                            )
                        );
                    }
                }}
            />
        </>
    );
};

export default inject((stores) => ({
    medicinesStore: stores.medicinesStore,
    commonStore: stores.commonStore,
    alarmsStore: stores.alarmsStore,
}))(observer(AddMedicine));
// observer: 스토어를 관측할 것이다.
// inject : 어떤 스토어일지
