import React from "react";
import styled from "styled-components";

const DayContainer = styled.View`
    flex-direction: row;
`;

const StyledText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme, isNotTodayAlarm }) => {
        if (isNotTodayAlarm) {
            return theme.main;
        } else {
            return theme.alarmDisabledText;
        }
    }};
`;

const Day = ({ dayArr, isNotTodayAlarm }) => {
    return (
        <DayContainer>
            {dayArr.map((item, i) => {
                return (
                    <StyledText isNotTodayAlarm={isNotTodayAlarm} key={i}>
                        {item}
                    </StyledText>
                );
            })}
        </DayContainer>
    );
};

export default Day;
