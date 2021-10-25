import React from "react";
import styled from "styled-components/native";

const BtnWrap = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
`;

const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.btnBackground};
    justify-content: center;
    align-items: center;
    border-radius: 12px;
`;
const StyledText = styled.Text`
    font-size: 16px;
    font-weight: 900;

    color: ${({ theme }) => theme.btnText};
`;

const ButtonFloating = ({
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

export default ButtonFloating;
