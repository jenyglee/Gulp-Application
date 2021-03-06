import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, TextButton, Input, ButtonFloating } from "@components/index";
import { isEmail, removeWhiteSpace } from "@/util";
import { apiEmailValidation } from "@/member/api/memberApi";
import { Alert, Animated, Dimensions, Platform } from "react-native";
import { useDispatch } from "react-redux";
import actionsMembers from "stores/members/memberActions";

const Container = styled.View`
    align-self: center;
    width: ${({ width }) => width - 40}px;
    background: ${({ theme }) => theme.white};
    display: flex;
    align-items: center;
`;

const InputContainer = styled.View`
    margin-top: 50px;
    margin-bottom: 36px;
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
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [allValue, setAllValue] = useState(false);
    const refPasswordConfirm = useRef(null);

    const opacityEmail = useRef(new Animated.Value(0)).current;
    const opacityPassword = useRef(new Animated.Value(0)).current;

    // ✨ 포커스 아웃이 되면 다음 인풋 노출
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // ✨ 애니메이션 'opacity'
    const inputAnimation = (opacityItem) => {
        Animated.timing(opacityItem, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    // ✨ 닉네임 확인
    const confirmNickname = () => {
        if (nickname != "") {
            setShowEmail(true);
            inputAnimation(opacityEmail);
        } else {
            Alert.alert("닉네임을 입력해주세요.");
        }
    };

    // ✨ 이메일 확인
    const confirmEmail = () => {
        if (email != "") {
            if (isEmail(email)) {
                setShowPassword(true);
                inputAnimation(opacityPassword);
            } else {
                Alert.alert("이메일을 올바르게 입력해주세요.");
            }
        } else {
            Alert.alert("이메일을 입력해주세요.");
        }
    };

    // ✨ 패스워드 확인
    const confirmPassword = () => {
        if (password != "") {
            if (password.length >= 6) {
                refPasswordConfirm.current.focus();
            } else {
                Alert.alert("비밀번호를 6자리 이상 입력해주세요.");
            }
        } else {
            Alert.alert("비밀번호를 입력해주세요.");
        }
    };

    // ✨ 패스워드 재입력 확인
    const confirmPasswordTwo = () => {
        if (passwordConfirm != "") {
            if (passwordConfirm.length >= 6) {
                return;
            } else {
                Alert.alert("비밀번호를 6자리 이상 입력해주세요.");
            }
        } else {
            Alert.alert("비밀번호를 한번 더 입력해주세요.");
        }
    };

    // ✨ 모든 값이 있는지 확인
    useEffect(() => {
        if ((nickname, email, password, passwordConfirm)) {
            setAllValue(true);
        } else {
            setAllValue(false);
        }
    });

    //✨ 회원가입하기
    const handleSignUpButtonPress = () => {
        if ((nickname, email, password, passwordConfirm)) {
            if (password === passwordConfirm) {
                dispatch(
                    actionsMembers.signup(nickname, email, password, navigation)
                );
            } else {
                Alert.alert("비밀번호가 일치하지 않습니다.");
            }
        } else {
            Alert.alert("모든 빈칸을 입력해주세요.");
        }
    };

    // ✨ 이메일 중복검사
    const handleEmailValidation = async () => {
        const response = await apiEmailValidation(email);
        if (response.validation) {
            Alert.alert("사용 가능한 이메일입니다.");
        } else {
            Alert.alert("이미 사용중인 이메일입니다.");
        }
    };

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            contentContainerStyle={{
                flex: 1,
                width: "100%",
            }}
            extraScrollHeight={50}
        >
            <Container width={width}>
                <InputContainer>
                    <StyledTitle>닉네임을 입력해주세요</StyledTitle>
                    <Input
                        title="닉네임"
                        placeholder="닉네임을 입력하세요"
                        value={nickname}
                        onBlur={() => {
                            confirmNickname();
                        }}
                        maxLenth={10}
                        onChangeText={(text) => {
                            const changedName = removeWhiteSpace(text);
                            setNickname(changedName);
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            confirmNickname();
                        }}
                    />
                </InputContainer>
                {showEmail ? (
                    <Animated.View
                        style={{
                            opacity: opacityEmail,
                            marginBottom: 36,
                        }}
                    >
                        <StyledTitle>이메일을 입력해주세요</StyledTitle>
                        <Input
                            title="이메일"
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onBlur={() => {
                                confirmEmail();
                            }}
                            maxLenth={10}
                            onChangeText={(text) => {
                                const changedEmail = removeWhiteSpace(text);
                                setEmail(changedEmail);
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                confirmEmail();
                            }}
                        />
                        <TextButton
                            onPress={handleEmailValidation}
                            btnStyle={{
                                marginLeft: 12,
                            }}
                            title="이메일 중복 확인"
                        />
                    </Animated.View>
                ) : null}
                {showPassword ? (
                    <Animated.View
                        style={{
                            opacity: opacityPassword,
                        }}
                    >
                        <StyledTitle>비밀번호를 입력해주세요.</StyledTitle>
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
                            onSubmitEditing={confirmPassword}
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
                            onSubmitEditing={confirmPasswordTwo}
                            secureTextEntry={true}
                        />
                    </Animated.View>
                ) : null}
            </Container>
            {Platform.OS === "ios" ? (
                <Button
                    title="회원가입하기"
                    onPress={handleSignUpButtonPress}
                    btnWrapStyle={{
                        width: width,
                    }}
                    containerStyle={{
                        backgroundColor: allValue
                            ? theme.btnBackground
                            : theme.btnBackgroundDisable,
                    }}
                />
            ) : (
                <ButtonFloating
                    btnWrapStyle={{
                        position: "absolute",
                        top: 628,
                        left: 0,
                    }}
                    title="회원가입하기"
                    onPress={() => {}}
                />
            )}
        </KeyboardAwareScrollView>
    );
};

export default SignupContainer00;
