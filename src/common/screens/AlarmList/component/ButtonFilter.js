import React from "react";
import styled from "styled-components";
import { icons20px } from "@/icons";

const BtnWrap = styled.TouchableOpacity``;

const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

const StyledText = styled.Text`
    margin-right: 3px;
    color: ${({ theme }) => theme.textSub};
`;

const StyledImage = styled.Image`
    width: 20px;
    height: 20px;
    /* background-color: red; */
`;

const ButtonFilter = ({ title, onPress }) => {
    return (
        <BtnWrap onPress={onPress}>
            <Container>
                <StyledText>{title}</StyledText>
                <StyledImage source={icons20px.filter} />
            </Container>
        </BtnWrap>
    );
};

export default ButtonFilter;
