import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { icons20px } from "@/icons";

const Container = styled.View`
    border-radius: 12px;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    flex-direction: row;
    padding: 15px 20px;
    margin-bottom: 10px;
    margin-right: 10px;
`;

const Icon = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`;

const StyledText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
    color: ${({ theme }) => theme.black};
`;

const TagButton = ({ id, deleteTask, name, brand }) => {
    const _onPress = () => {
        deleteTask(id);
    };
    return (
        <Container>
            <TouchableOpacity onPress={_onPress}>
                <Icon source={icons20px.x} resizeMode="contain" />
            </TouchableOpacity>
            <StyledText>
                {brand} - {name}
            </StyledText>
        </Container>
    );
};

export default TagButton;
