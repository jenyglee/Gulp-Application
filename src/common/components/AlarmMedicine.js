import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { icons20px } from "@/icons";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

const ItemName = styled.Text`
    font-size: 16px;
    color: ${({ theme, completed, isNotTodayAlarm }) =>{
        if(isNotTodayAlarm){
            if(completed){
                return theme.textDisable
            } else {
                return theme.black
            }
        } else if (!isNotTodayAlarm){
            return theme.alarmDisabledText
        } else return null;
    }};
    /* color: ${({theme, completed}) => completed ? theme.textDisable : theme.textSub}; */
    padding-right: 30px;
`;

const Icon = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 6px;
`;

const AlarmMedicine = ({ name, containerStyle, completed, isNotTodayAlarm }) => {
    return (
        <Container style={containerStyle}>
            <Icon source={isNotTodayAlarm ? icons20px.medicine : icons20px.MedicineDisabled} resizeMode="contain" />
            <ItemName completed={completed} isNotTodayAlarm={isNotTodayAlarm}>{name}</ItemName>
        </Container>
    );
};

export default AlarmMedicine;
