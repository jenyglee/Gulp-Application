import React, { useState, useRef, useContext } from "react";
import { Alert, Dimensions } from "react-native";
import styled, { ThemeContext } from "styled-components";
import { Button, TextButton } from "@components/index";
import { InputWithIcon } from "@/member/screens/Signin/component/index";
import { BasicModal } from "@components/modal/index";
import { isEmail, removeWhiteSpace } from "@/util";
import { icons20px } from "@/icons";
import { logo } from "@/images";
import { login } from "@/member/api/memberApi";
import { illust } from "@/images";

const Container = styled.View`
    /* flex: 1; */
    align-items: center;
    height: 100%;
    /* background-color: green; */
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
    const theme = useContext(ThemeContext);
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

            const user = await login({ email, password });
            navigation.navigate("Main", { user });
        } catch (e) {
            Alert.alert(email, password);
        }
    };

    // ✨ 이메일 공백제거, 유효성 검사
    const _handleEmail = (email) => {
        const changedEmail = removeWhiteSpace(email);
        setEmail(changedEmail);
        // setErrorMessage(isEmail(changedEmail) ? "" : "이메일이 틀렸어");
    };

    // ✨ 비밀번호 공백제거
    const _handlePassword = (password) => {
        const changedPassword = removeWhiteSpace(password);
        setPassword(changedPassword);
    };

    //  ✨ 에러모달 닫기
    const closeModal = () => {
        setErrorModal(false);
    };

    return (
        <Container>
            <ContentContainer width={width} height={height}>
                <Logo source={logo.logoAndTitle} resizeMode="contain" />
                <InputWithIcon
                    title="이메일"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onBlur={() => {}}
                    // maxLength={10}
                    onChangeText={(email) => _handleEmail(email)}
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
                    onChangeText={(password) => _handlePassword(password)}
                    onSubmitEditing={SigninButtonPress}
                    secureTextEntry={true}
                    icon={icons20px.password}
                    containerStyle={{
                        marginBottom: 60,
                    }}
                />
                {/* {errorMessage != "" ? (
                    <ErrorMessage message={errorMessage} />
                ) : null} */}
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
                    onPress={() => {}}
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
