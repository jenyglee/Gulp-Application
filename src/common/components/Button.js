import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const BtnWrap = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
`;

const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.btnBackground};
    border-radius: 12px;
    justify-content: center;
    align-items: center;
`;
const StyledText = styled.Text`
    font-size: 16px;
    font-weight: 900;
    color: ${({ theme }) => theme.btnText};
`;

const Button = ({
    onPress,
    title,
    btnWrapStyle,
    containerStyle,
    textStyle,
}) => {
    return (
        <BtnWrap onPress={onPress} style={btnWrapStyle}>
            <Container style={containerStyle}>
                <StyledText style={textStyle}>{title}</StyledText>
            </Container>
        </BtnWrap>
    );
};

export default Button;
