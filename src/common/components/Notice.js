import React from "react";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin: 25px 0;
`;

const StyledImage = styled.Image`
    width: 50px;
    height: 50px;
    margin-right: 14px;
`;

const TextContainer = styled.View`
    /* justify-content: center; */
    /* align-items: center; */
`;

const StyledTitle = styled.Text`
    font-size: 16px;
    font-weight: 900;
    color: ${({ theme }) => theme.textBasic};
    margin-bottom: 5px;
`;

const StyledSubTitle = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.textBasic};
`;

const Notice = ({ illust, title, subTitle, textStyle }) => {
    return (
        <Container>
            <StyledImage source={illust} resizeMode="contain" />
            <TextContainer>
                <StyledTitle style={textStyle}>{title}</StyledTitle>
                <StyledSubTitle style={textStyle}>{subTitle}</StyledSubTitle>
            </TextContainer>
        </Container>
    );
};

export default Notice;
