import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

const WeekButtonView = styled.View`
    width: 30px;
    height: 30px;
    background-color: ${({ checked, theme }) =>
        checked ? theme.main : theme.background};
    margin-right: 7px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;

const WeekButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({ checked, theme }) => (checked ? theme.white : theme.black)};
`;

const WeekButton = ({ title, id, onPress, checked }) => {
    const _onPress = () => {
        onPress(id);
    };
    return (
        <TouchableOpacity onPress={_onPress}>
            <WeekButtonView checked={checked}>
                <WeekButtonText checked={checked}>{title}</WeekButtonText>
            </WeekButtonView>
        </TouchableOpacity>
    );
};

export default WeekButton;
