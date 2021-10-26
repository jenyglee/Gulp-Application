import React from "react";
import styled from "styled-components";

const BtnWrap = styled.TouchableOpacity``;
const Container = styled.View`
    border-radius: 14px;
    padding: 0 12px;
    height: 28px;
    background-color: ${({ theme }) => theme.smallBtnBackgroundChecked};
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const StyledImage = styled.Image`
    width: 14px;
    margin-right: 2px;
`;
const StyledText = styled.Text`
    color: ${({ theme }) => theme.smallBtnTextChecked};
    font-weight: bold;
`;

const ButtonSmall = ({ containerStyle, textStyle, icon, title, onPress }) => {
    return (
        <BtnWrap onPress={onPress}>
            <Container style={containerStyle}>
                <StyledImage source={icon} resizeMode="contain" />
                <StyledText style={textStyle}>{title}</StyledText>
            </Container>
        </BtnWrap>
    );
};

export default ButtonSmall;
