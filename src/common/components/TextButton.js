import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const BtnWrap = styled.TouchableOpacity`
    width: auto;
    height: auto;
`;

const Container = styled.View`
    width: 100%;
    height: auto;
`;
const StyledText = styled.Text`
    font-size: 16px;
    font-weight: 900;
    color: ${({ theme }) => theme.textBtnText};
`;

const TextButton = ({ onPress, title, btnStyle }) => {
    return (
        <BtnWrap onPress={onPress} style={btnStyle}>
            <Container>
                <StyledText>{title}</StyledText>
            </Container>
        </BtnWrap>
    );
};

export default TextButton;
