import React, { useState, useRef, useContext } from "react";
import { Alert, Dimensions } from "react-native";
import styled, { ThemeContext } from "styled-components";
import { Button, TextButton } from "@components/index";
import { BasicModal } from "@components/modal/index";
import { InputWithIcon } from "@/member/screens/Signin/component/index";
import { icons20px } from "@/icons";
import { logo, illust } from "@/images";
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
    const [errorMessage, setErrorMessage] = useState("");
    const [errorModal, setErrorModal] = useState(false);

    const SigninButtonPress = async () => {
        try {
            if (email === "") {
                setErrorModal(true);
                setErrorMessage("이메일을 입력해주세요.");
                return;
            }
            if (password === "") {
                setErrorModal(true);
                setErrorMessage("비밀번호를 입력해주세요.");
                return;
            }

            await signin({ email, password });
            // const user = await signin({ email, password });
            // console.log(user);
            navigation.navigate("AlarmList");
            // navigation.navigate("AlarmList", { user });
        } catch (e) {
            Alert.alert(e.message);
        }
    };

    //  ✨ 에러모달 닫기
    const closeModal = () => {
        setErrorModal(false);
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
                {errorModal ? (
                    <BasicModal
                        title={errorMessage}
                        onPress={closeModal}
                        src={illust.error}
                    />
                ) : null}

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
