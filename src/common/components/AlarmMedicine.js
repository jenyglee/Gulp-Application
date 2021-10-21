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
    color: ${({ theme, hadMedicine }) =>
        hadMedicine ? theme.textDisable : theme.textSub};
    padding-right: 30px;
`;

const Icon = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 6px;
`;

const AlarmMedicine = ({ name, containerStyle, hadMedicine }) => {
    return (
        <Container style={containerStyle}>
            <Icon source={icons20px.medicine} resizeMode="contain" />
            <ItemName hadMedicine={hadMedicine}>{name}</ItemName>
        </Container>
    );
};

export default AlarmMedicine;
