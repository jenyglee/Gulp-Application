import React, { useState, useRef, useContext } from "react";
import { Alert, Dimensions } from "react-native";
import styled, { ThemeContext } from "styled-components";
import { Button, TextButton } from "@components/index";
import { InputWithIcon } from "@/member/screens/Signin/component/index";
import { icons20px } from "@/icons";
import { logo } from "@/images";
import { isEmail, removeWhiteSpace } from "@/util";
import { signin } from "@/member/api/memberApi";

const Container = styled.View`
    align-items: center;
    height: 100%;
`;

const ContentContainer = styled.View`
    width: ${({ width }) => width - 48}px;
    align-items: center;
    position: absolute;
    top: ${({ height }) => height / 10}px;
`;

const Logo = styled.Image`
    width: 150px;
`;

const SignupContainer = styled.View`
    flex-direction: row;
    align-items: center;
    position: absolute;
    bottom: 40px;
`;

const StyledText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.textSub};
`;

const SigninContainer = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    // const theme = useContext(ThemeContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const refPassword = useRef(null);

    // ✨ 이메일/비밀번호 검토 및 로그인 진행
    const SigninButtonPress = async () => {
        try {
            if (email !== "") {
                if (isEmail(email)) {
                    if (password !== "") {
                        await signin({ email, password });
                        navigation.navigate("AlarmList");
                    } else {
                        Alert.alert("비밀번호를 입력해주세요.");
                        return;
                    }
                } else {
                    Alert.alert("이메일을 올바르게 입력해주세요.");
                    return;
                }
            } else {
                Alert.alert("이메일을 입력해주세요.");
                return;
            }
            // const user = await signin({ email, password });
            // console.log(user);
            // navigation.navigate("AlarmList", { user });
        } catch (e) {
            Alert.alert(e.message);
        }
    };

    return (
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
                    onSubmitEditing={SigninButtonPress}
                    secureTextEntry={true}
                    icon={icons20px.password}
                    containerStyle={{
                        marginBottom: 60,
                    }}
                />

                <Button title="로그인" onPress={SigninButtonPress} />
                <TextButton
                    title="비밀번호 찾기"
                    btnStyle={{
                        marginTop: 20,
                    }}
                    onPress={() => {
                        navigation.navigate("FindPassword00");
                    }}
                />
            </ContentContainer>
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
        </Container>
    );
};

export default SigninContainer;
