import React, { useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

const SignupContainer04 = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;

    const handleSignInButtonPress = () => {
        navigation.navigate("Signin");
    };
    return (
        <Container>
            <ContentContainer width={width}>
                <ContentArea height={height}>
                    <StyledTitle>야호!</StyledTitle>
                    <StyledTitle
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        회원가입이 완료되었어요!
                    </StyledTitle>
                    <StyledSubTitle>이제 더 유용한 서비스를</StyledSubTitle>
                    <StyledSubTitle>받으실 수 있어요!</StyledSubTitle>
                    <StyledImage source={illust.signup} resizeMode="contain" />
                </ContentArea>
                <Button
                    title="로그인하기"
                    btnWrapStyle={{
                        width: width,
                        alignSelf: "center",
                    }}
                    onPress={handleSignInButtonPress}
                />
            </ContentContainer>
        </Container>
    );
};

export default SignupContainer04;
