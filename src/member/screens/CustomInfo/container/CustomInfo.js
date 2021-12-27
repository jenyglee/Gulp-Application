import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, InputDisabled } from "@components/index";
import { removeWhiteSpace } from "@/util";
import { Alert, Dimensions } from "react-native";
import { apiUpdateUser } from "@/member/api/memberApi";
import { useDispatch } from "react-redux";
import actionsMembers from "stores/members/memberActions";

const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.white};
    display: flex;
    margin-top: 50px;
    align-items: center;
`;

const InputContainer = styled.View`
    width: ${({ width }) => width - 48}px;
`;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const SignupContainer00 = ({ navigation }) => {
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);
    const width = Dimensions.get("window").width;
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const refPasswordConfirm = useRef(null);

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser(); //유저 정보 가져오기
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ 유저 정보 가져오기
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        const user = jwt_decode(token);
        setToken(token);
        setEmail(user.email);
        setNickname(user.nickname);
    };

    // ✨ 회원정보 변경
    const handleSaveButtonPress = async () => {
        if (nickname != "") {
            if (
                (password.length >= 6 && passwordConfirm.length >= 6) ||
                (password.length == 0 && passwordConfirm.length == 0)
            ) {
                // if 패스워드와 패스워드컨펌이 6자리 이상이라면
                if (password == passwordConfirm) {
                    // if 패스워드와 패스워드컨펌이 같다면
                    const response = await apiUpdateUser({
                        token,
                        nickname,
                        password,
                    });
                    if (response.status === 200) {
                        Alert.alert("회원정보 변경이 완료되었습니다.");
                        dispatch(actionsMembers.setNickname(nickname));
                        navigation.goBack();
                    }
                } else {
                    Alert.alert("비밀번호가 일치하지 않습니다.");
                }
            } else {
                Alert.alert("비밀번호는 6자리 이상입니다.");
            }
        } else {
            Alert.alert("닉네임을 입력해주세요.");
        }
    };

    return (
        <>
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flex: 1,
                }}
                extraScrollHeight={20}
            >
                <Container>
                    <InputContainer width={width}>
                        <StyledTitle
                            style={{
                                color: theme.inputPlaceholderText,
                            }}
                        >
                            이메일은 변경할 수 없어요
                        </StyledTitle>
                        <InputDisabled
                            title="이메일"
                            value={email}
                            containerStyle={{
                                marginBottom: 36,
                            }}
                        />
                    </InputContainer>

                    <InputContainer width={width}>
                        <StyledTitle>변경할 닉네임을 입력해주세요</StyledTitle>
                        <Input
                            title="닉네임"
                            value={nickname}
                            placeholder="닉네임을 입력하세요"
                            maxLenth={10}
                            onChangeText={(text) => {
                                const changedNickname = removeWhiteSpace(text);
                                setNickname(changedNickname);
                            }}
                            onBlur={() => {}}
                            returnKeyType="done"
                            containerStyle={{
                                marginBottom: 36,
                            }}
                        />
                    </InputContainer>

                    <InputContainer width={width}>
                        <StyledTitle>
                            변경할 비밀번호를 입력해주세요
                        </StyledTitle>
                        <Input
                            title="비밀번호"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            maxLenth={10}
                            returnKeyType="next"
                            onBlur={() => {}}
                            onChangeText={(text) => {
                                const changedPassword = removeWhiteSpace(text);
                                setPassword(changedPassword);
                            }}
                            secureTextEntry={true}
                        />
                        <Input
                            ref={refPasswordConfirm}
                            title="비밀번호 재입력"
                            placeholder="비밀번호를 한번 더 입력하세요"
                            value={passwordConfirm}
                            maxLenth={10}
                            onBlur={() => {}}
                            returnKeyType="done"
                            onChangeText={(text) => {
                                const changedPasswordConfirm =
                                    removeWhiteSpace(text);
                                setPasswordConfirm(changedPasswordConfirm);
                            }}
                            secureTextEntry={true}
                        />
                    </InputContainer>
                </Container>
            </KeyboardAwareScrollView>
            <Button
                title="저장하기"
                onPress={handleSaveButtonPress}
                btnWrapStyle={{
                    width: width,
                    position: "absolute",
                }}
            />
        </>
    );
};

export default SignupContainer00;
