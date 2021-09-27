import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";

const WeekButtonView = styled.View`
    width: 40px;
    height: 40px;
    background-color: ${({ checked, theme }) =>
        checked ? theme.main : theme.white};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WeekButtonText = styled.Text`
    font-size: 18px;
    color: ${({ checked, theme }) => (checked ? theme.white : theme.main)};
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
