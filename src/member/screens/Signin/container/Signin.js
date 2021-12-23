import React, { useState, useRef } from "react";
import { Dimensions, Platform } from "react-native";
import styled from "styled-components";
import { ButtonFloating, TextButton } from "@components/index";
import { InputWithIcon } from "@/member/screens/Signin/component/index";
import { icons20px } from "@/icons";
import { logo } from "@/images";
import { isEmail, removeWhiteSpace } from "@/util";
import { apiSignin } from "@/member/api/memberApi";
import { useDispatch } from "react-redux";
import actionsMembers from "stores/members/memberActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
    align-items: center;
    height: 100%;
`;

const ContentContainer = styled.View`
    width: ${({ width }) => width - 48}px;
    align-items: center;
    margin-top: 100px;
`;

const Logo = styled.Image`
    width: 150px;
`;

const SignupContainer = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: 40px;
`;

const SignupContainerAndroid = styled.View`
    flex-direction: row;
    margin-top: 180px;
`;

const StyledText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.textBasic};
`;

const SigninContainer = ({ navigation }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const refPassword = useRef(null);

    // ✨ 로그인 진행
    const handleSignInButtonPress = () => {
        dispatch(
            actionsMembers.signin(
                email,
                password,
                apiSignin,
                isEmail,
                navigation
            )
        );
    };

    //✨ 비밀번호 찾기 화면으로 이동
    const handleFindPasswordButtonPress = () => {
        navigation.navigate("FindPassword00");
    };

    // ✨ 회원가입 화면으로 이동
    const handleSignUpButtonPress = () => {
        navigation.navigate("Signup00");
    };

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            contentContainerStyle={{
                flex: 1,
            }}
        >
            <Container>
                <ContentContainer width={width} height={height}>
                    <Logo source={logo.signinLogo} resizeMode="contain" />
                    <InputWithIcon
                        title="이메일"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onBlur={() => {}}
                        onChangeText={(email) => {
                            const changedEmail = removeWhiteSpace(email);
                            setEmail(changedEmail);
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            refPassword.current.focus();
                        }}
                        icon={icons20px.user}
                    />
                    <InputWithIcon
                        ref={refPassword}
                        title="비밀번호"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onBlur={() => {}}
                        maxLength={12}
                        returnKeyType="done"
                        onChangeText={(password) => {
                            const changedPassword = removeWhiteSpace(password);
                            setPassword(changedPassword);
                        }}
                        onSubmitEditing={handleSignInButtonPress}
                        secureTextEntry={true}
                        icon={icons20px.password}
                        containerStyle={{
                            marginBottom: 60,
                        }}
                    />

                    <ButtonFloating
                        title="로그인"
                        onPress={handleSignInButtonPress}
                    />
                    <TextButton
                        title="비밀번호 찾기"
                        btnStyle={{
                            marginTop: 20,
                        }}
                        onPress={handleFindPasswordButtonPress}
                    />
                    {Platform.OS === "android" ? (
                        <SignupContainerAndroid>
                            <StyledText>계정이 없으신가요?</StyledText>
                            <TextButton
                                title="가입하기"
                                btnStyle={{
                                    marginLeft: 5,
                                }}
                                onPress={handleSignUpButtonPress}
                            />
                        </SignupContainerAndroid>
                    ) : null}
                </ContentContainer>
                {Platform.OS === "ios" ? (
                    <SignupContainer>
                        <StyledText>계정이 없으신가요?</StyledText>
                        <TextButton
                            title="가입하기"
                            btnStyle={{
                                marginLeft: 5,
                            }}
                            onPress={handleSignUpButtonPress}
                        />
                    </SignupContainer>
                ) : null}
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default SigninContainer;
