import React, { useState, useRef, useContext } from "react";
import { Alert, Dimensions, Platform, Text } from "react-native";
import styled, { css, ThemeContext } from "styled-components";
import { ButtonFloating, TextButton } from "@components/index";
import { InputWithIcon } from "@/member/screens/Signin/component/index";
import { icons20px } from "@/icons";
import { logo } from "@/images";
import { isEmail, removeWhiteSpace } from "@/util";
import { apiSignin } from "@/member/api/memberApi";
import { useSelector, useDispatch } from "react-redux";
import { stateMembers } from "stores/members/membersSlice";
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
    /* ${Platform.select({
        ios: css`
            position: absolute;
            bottom: 40px;
        `,
        android: css`
            width: 100px;
            height: 100px;
        `,
    })} */
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
                        // maxLength={10}
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
                        onSubmitEditing={() => {
                            dispatch(
                                actionsMembers.SigninButtonPress(
                                    email,
                                    password,
                                    apiSignin,
                                    isEmail,
                                    navigation
                                )
                            );
                        }}
                        secureTextEntry={true}
                        icon={icons20px.password}
                        containerStyle={{
                            marginBottom: 60,
                        }}
                    />

                    <ButtonFloating
                        title="로그인"
                        onPress={() => {
                            dispatch(
                                actionsMembers.SigninButtonPress(
                                    email,
                                    password,
                                    apiSignin,
                                    isEmail,
                                    navigation
                                )
                            );
                        }}
                    />
                    <TextButton
                        title="비밀번호 찾기"
                        btnStyle={{
                            marginTop: 20,
                        }}
                        onPress={() => {
                            navigation.navigate("FindPassword00");
                        }}
                    />
                    {Platform.OS === "android" ? (
                        <SignupContainerAndroid>
                            <StyledText>계정이 없으신가요?</StyledText>
                            <TextButton
                                title="가입하기"
                                btnStyle={{
                                    marginLeft: 5,
                                }}
                                onPress={() => {
                                    navigation.navigate("Signup00");
                                }}
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
                            onPress={() => {
                                navigation.navigate("Signup00");
                            }}
                        />
                    </SignupContainer>
                ) : null}
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default SigninContainer;
