import React from "react";
import styled from "styled-components";

const DayContainer = styled.View`
    flex-direction: row;
`;

const StyledText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme }) => theme.main};
`;

const Day = ({ dayArr }) => {
    return (
        <DayContainer>
            {dayArr.map((item, i) => {
                return <StyledText key={i}>{item} </StyledText>;
            })}
        </DayContainer>
    );
};

export default Day;
