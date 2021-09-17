import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    width: 200px;
    height: 30px;
    border-radius: 15px;
    margin: 5px;
    border: 1px solid #aaa;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledText = styled.Text`
    font-size: 14px;
    color: #000;
`;

const DeleteButton = ({ id, deleteTask, title }) => {
    const _onPress = () => {
        deleteTask(id);
    };
    return (
        <TouchableOpacity onPress={_onPress}>
            <Container>
                <StyledText>{title}</StyledText>
            </Container>
        </TouchableOpacity>
    );
};

export default DeleteButton;
