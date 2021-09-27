import React from "react";
import styled from "styled-components";
import { icons30px } from "@/icons";

const Container = styled.View`
    padding: 18px 20px;
    background-color: ${({ theme }) => theme.main};
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
`;

const LeftArrowBtn = styled.TouchableOpacity``;
const LeftArrow = styled.Image`
    width: 30px;
    height: 30px;
`;

const RightArrowBtn = styled.TouchableOpacity``;
const RightArrow = styled.Image`
    width: 30px;
    height: 30px;
`;

const TitleContainer = styled.View`
    flex-direction: row;
`;

const Month = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.white};
`;

const Line = styled.View`
    width: 1px;
    height: 24px;
    margin: 0 10px;
    background-color: ${({ theme }) => theme.white};
`;

const TextContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const StyledText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.white};
    margin-right: 8px;
`;

const Per = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.white};
`;

const CalendarTitle = () => {
    return (
        <Container>
            <LeftArrowBtn>
                <LeftArrow
                    source={icons30px.leftArrow_w}
                    resizeMode="contain"
                />
            </LeftArrowBtn>
            <TitleContainer>
                <Month>8월</Month>
                <Line />
                <TextContainer>
                    <StyledText>복용 달성률</StyledText>
                    <Per>52%</Per>
                </TextContainer>
            </TitleContainer>
            <RightArrowBtn>
                <RightArrow
                    source={icons30px.rightArrow_w}
                    resizeMode="contain"
                />
            </RightArrowBtn>
        </Container>
    );
};

export default CalendarTitle;
