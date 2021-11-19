import React from "react";
import styled from "styled-components";

const BtnWrap = styled.TouchableOpacity``;
const Container = styled.View`
    border-radius: 14px;
    padding: 0 12px;
    height: 28px;
    background-color: ${({ completed, theme }) => completed ? theme.smallBtnBackgroundChecked : theme.smallBtnBackground};
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const StyledImage = styled.Image`
    width: 14px;
    margin-right: 2px;
`;
const StyledText = styled.Text`
    color: ${({ completed, theme }) => completed ? theme.smallBtnTextChecked : theme.smallBtnText};
    font-weight: bold;
`;

const ButtonSmall = ({ containerStyle, textStyle, icon, title, onPress, completed }) => {
    return (
        <BtnWrap onPress={onPress}>
            <Container style={containerStyle} completed={completed}>
                <StyledImage source={icon} resizeMode="contain" />
                <StyledText style={textStyle} completed={completed}>{title}</StyledText>
            </Container>
        </BtnWrap>
    );
};

export default ButtonSmall;
