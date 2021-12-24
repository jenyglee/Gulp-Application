import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    height: 50px;
    background: ${({ theme }) => theme.inputHold};
    margin-bottom: 12px;
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
`;

const StyledText = styled.Text`
    color: ${({ theme }) => theme.inputPlaceholderText};
`;

const InputDisabled = ({ value, containerStyle }) => {
    const width = Dimensions.get("window").width;
    return (
        <Container width={width} style={containerStyle}>
            <StyledText>{value}</StyledText>
        </Container>
    );
};

export default InputDisabled;
