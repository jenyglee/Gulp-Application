import React from "react";
import styled from "styled-components";

const Container = styled.View`
    padding: 23px 0;
    background-color: ${({ theme }) => theme.main};
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

const StyledText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.white};
    margin-right: 8px;
`;

const CalendarTitleNotSignin = () => {
    return (
        <Container>
            <StyledText>내 이번달 복용 달성률은?</StyledText>
        </Container>
    );
};

export default CalendarTitleNotSignin;
