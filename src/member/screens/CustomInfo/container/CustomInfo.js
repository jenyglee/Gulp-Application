import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, InputDisabled } from "@components/index";
import { removeWhiteSpace } from "@/util";
import { View, Alert, Animated, Dimensions } from "react-native";
import { updateUser } from "@/member/api/memberApi";
// import { createUser } from "@/firebase";

const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.white};
    display: flex;
    /* justify-content: center; */
    margin-top: 50px;
    align-items: center;
`;

const InputContainer = styled.View`
    /* margin-bottom: 36px; */
`;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const SignupContainer00 = ({ navigation }) => {
    const theme = useContext(ThemeContext);
    const width = Dimensions.get("window").width;
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [allValue, setAllValue] = useState(false);
    const refPasswordConfirm = useRef(null);

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser();
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ 유저 정보 가져오기
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token")
        const user = jwt_decode(token);
        setToken(token)
        setEmail(user.email);
        setNickname(user.nickname);
    };

    // ✨ 닉네임 확인
    const confirmValue = async () => {
        if (nickname != "") {
            if (
                (password.length >= 6 && passwordConfirm.length >= 6) ||
                (password.length == 0 && passwordConfirm.length == 0)
            ) {
                // if 패스워드와 패스워드컨펌이 6자리 이상이라면
                if (password == passwordConfirm) {
                    // if 패스워드와 패스워드컨펌이 같다면
                    // console.log(token, nickname, password)
                    await updateUser({ token, nickname, password });
                    // Alert.alert("회원정보 변경이 완료되었습니다.");
                    // navigation.goBack();
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
                    <InputContainer>
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

                    <View>
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
                    </View>

                    <View>
                        <StyledTitle>변경할 비밀번호를 입력해주세요</StyledTitle>
                        <Input
                            // ref={refPassword}
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
                    </View>
                </Container>
            </KeyboardAwareScrollView>
            <Button
                title="저장하기"
                onPress={confirmValue}
                btnWrapStyle={{
                    width: width,
                    position: "absolute",
                }}
            />
        </>
    );
};

export default SignupContainer00;
