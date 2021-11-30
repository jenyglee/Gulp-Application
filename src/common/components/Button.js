import React from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";

const BtnWrap = styled.TouchableOpacity`
    width: 100%;
    position: absolute;
    bottom: 0;
    height: ${Platform.select({ ios: "78px", android: "60px" })};
`;

const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.btnBackground};
    justify-content: center;
    align-items: center;
`;
const StyledText = styled.Text`
    font-size: 16px;
    font-weight: 900;
    color: ${({ theme }) => theme.btnText};
    margin-bottom: ${Platform.select({ ios: "20px", android: "0" })};
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
