import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { icons20px } from "@/icons";

const Container = styled.View`
    height: 30px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0 14px 0 10px;
    margin-bottom: 10px;
    margin-right: 10px;
`;

const Icon = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 5px;
    /* background-color: red; */
`;

const StyledText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.black};
    /* background-color: red; */
`;

const TagButton = ({ id, deleteTask, title }) => {
    const _onPress = () => {
        deleteTask(id);
    };
    return (
        <TouchableOpacity onPress={_onPress}>
            <Container>
                <Icon source={icons20px.x} resizeMode="contain" />
                <StyledText>{title}</StyledText>
            </Container>
        </TouchableOpacity>
    );
};

export default TagButton;
