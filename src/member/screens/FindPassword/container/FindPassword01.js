import React, { useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { Button } from "@components/index";
import { illust } from "@/images";

const Container = styled.View`
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.white};
    align-items: center;
`;

const ContentContainer = styled.View`
    width: ${({ width }) => width - 48}px;
    height: 100%;
`;

const ContentArea = styled.View`
    align-items: center;
    position: absolute;
    width: 100%;
    top: ${({ height }) => height / 5}px;
`;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: 900;
    color: ${({ theme }) => theme.textBasic};
`;

const StyledSubTitle = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.textBasic};
`;

const StyledImage = styled.Image`
    width: 100%;
    height: 132px;
    margin-top: 22px;
`;

const ButtonArea = styled.View`
    width: 100%;
    position: absolute;
    bottom: 40px;
`;

const FindPasswordContainer01 = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;

    return (
        <Container>
            <ContentContainer width={width}>
                <ContentArea height={height}>
                    <StyledTitle>이메일로 비밀번호 변경</StyledTitle>
                    <StyledTitle
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        메일을 보냈어요
                    </StyledTitle>
                    <StyledSubTitle>이메일로 접속해서</StyledSubTitle>
                    <StyledSubTitle>
                        비밀번호변경 버튼을 눌러주세요!
                    </StyledSubTitle>
                    <StyledImage
                        source={illust.findPassword}
                        resizeMode="contain"
                    />
                </ContentArea>
                <ButtonArea>
                    <Button
                        title="홈으로"
                        onPress={() => navigation.navigate("AlarmList")}
                    />
                </ButtonArea>
            </ContentContainer>
        </Container>
    );
};

export default FindPasswordContainer01;
