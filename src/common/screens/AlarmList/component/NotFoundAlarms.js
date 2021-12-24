import React from "react";
import styled from "styled-components";
import { illust } from "@/images";

const Wrap = styled.View`
    background-color: ${({ theme }) => theme.white};
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
`;
const ImageWrap = styled.View`
    height: 54px;
`;
const StyledImage = styled.Image`
    height: 100%;
`;
const TextWrap = styled.View`
    display: flex;
    align-items: center;
    margin-top: 25px;
`;
const StyledText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.textSub};
    margin-bottom: 3px;
`;

const NotFoundAlarms = () => {
    return (
        <Wrap>
            <ImageWrap>
                <StyledImage source={illust.error} resizeMode="contain" />
            </ImageWrap>
            <TextWrap>
                <StyledText>오늘은 알람이 없어요!</StyledText>
                <StyledText>새로운 알람을 추가해주세요.</StyledText>
            </TextWrap>
        </Wrap>
    );
};

export default NotFoundAlarms;
