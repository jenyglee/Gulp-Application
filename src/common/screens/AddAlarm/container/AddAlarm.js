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
import { inject, observer } from "mobx-react";

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

const AddMedicine = ({
    navigation,
    medicinesStore,
    commonStore,
    alarmsStore,
}) => {
    const { medicineList, deleteTask, getMedicine } = medicinesStore;
    const { weekAll, week, allWeekCheck, weekCheck, whatTime, time } =
        commonStore;
    const { saveMedicine } = alarmsStore;
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const theme = useContext(ThemeContext);
    const weekCheckList = []; // 체크된 요일

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getMedicine();
        });
        return () => removeFocusEvent();
    }, []);

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
            <Button
                title="저장하기"
                onPress={() => {
                    saveMedicine(
                        medicineList,
                        time,
                        week,
                        weekCheckList,
                        navigation
                    );
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
