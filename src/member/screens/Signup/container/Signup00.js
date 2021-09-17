import React, { useState, useRef } from "react";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Image } from "@components/index";
import { BasicModal } from "@components/modal/index";
import { illust } from "@/images";
import { isEmail, removeWhiteSpace } from "@/util";
// import { createUser } from "@/firebase";

const Container = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.white};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.View``;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const DEFAULT_PHOTO =
    "https://firebasestorage.googleapis.com/v0/b/medicine-cc1f6.appspot.com/o/face.png?alt=media";

const SignupContainer00 = ({ navigation }) => {
    const [photo, setPhoto] = useState(DEFAULT_PHOTO);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);

    // ✨ 포커스 아웃이 되면 다음 인풋 노출
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [errorModal, setErrorModal] = useState(false);

    //  ✨ 에러모달 닫기
    const closeModal = () => {
        setErrorModal(false);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flex: 1,
            }}
            extraScrollHeight={20}
        >
            <Container>
                {/* <Image url={photo} onChangePhoto={setPhoto} /> */}
                <InputContainer>
                    <StyledTitle>이름을 입력해주세요</StyledTitle>
                    <Input
                        title="이름"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onBlur={() => {}}
                        maxLenth={10}
                        onChangeText={(text) => {
                            const changedName = removeWhiteSpace(text);
                            setName(changedName);
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            // if (name != "") {
                            //     setShowEmail(true);
                            // } else {
                            //     setErrorModal(true);
                            //     setErrorMessage("이름을 입력해주세요.");
                            // }
                            setShowEmail(true);
                        }}
                    />
                </InputContainer>
                {showEmail ? (
                    <InputContainer>
                        <StyledTitle>이메일이 무엇인가요?</StyledTitle>
                        <Input
                            ref={refEmail}
                            title="이메일"
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onBlur={() => {}}
                            maxLenth={10}
                            onChangeText={(text) => {
                                const changedEmail = removeWhiteSpace(text);
                                setEmail(changedEmail);
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                // if (email != "") {
                                //     if (isEmail(email)) {
                                //         setShowPassword(true);
                                //     } else {
                                //         setErrorModal(true);
                                //         setErrorMessage(
                                //             "이메일을 올바르게 입력해주세요."
                                //         );
                                //     }
                                // } else {
                                //     setErrorModal(true);
                                //     setErrorMessage("이메일을 입력해주세요.");
                                // }
                                setShowPassword(true);
                            }}
                        />
                    </InputContainer>
                ) : null}
                {showPassword ? (
                    <InputContainer>
                        <StyledTitle>비밀번호를 입력해주세요.</StyledTitle>
                        <Input
                            ref={refPassword}
                            title="비밀번호"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onBlur={() => {}}
                            maxLenth={10}
                            returnKeyType="next"
                            onChangeText={(text) => {
                                const changedPassword = removeWhiteSpace(text);
                                setPassword(changedPassword);
                            }}
                            onSubmitEditing={() => {
                                // if (password != "") {
                                //     refPasswordConfirm.current.focus();
                                // } else {
                                //     setErrorModal(true);
                                //     setErrorMessage("비밀번호를 입력해주세요.");
                                // }
                                refPasswordConfirm.current.focus();
                            }}
                            secureTextEntry={true}
                        />
                        <Input
                            ref={refPasswordConfirm}
                            title="비밀번호 재입력"
                            placeholder="비밀번호를 한번 더 입력하세요"
                            value={passwordConfirm}
                            onBlur={() => {}}
                            maxLenth={10}
                            returnKeyType="done"
                            onChangeText={(text) => {
                                const changedPasswordConfirm =
                                    removeWhiteSpace(text);
                                setPasswordConfirm(changedPasswordConfirm);
                            }}
                            onSubmitEditing={() => {
                                // if (passwordConfirm != "") {
                                //     if (
                                //         password.length >= 6 ||
                                //         passwordConfirm.length >= 6
                                //     ) {
                                //         if (password == passwordConfirm) {
                                //             navigation.navigate("Signup01");
                                //         } else {
                                //             setErrorModal(true);
                                //             setErrorMessage(
                                //                 "비밀번호가 일치하지 않습니다."
                                //             );
                                //         }
                                //     } else {
                                //         setErrorModal(true);
                                //         setErrorMessage(
                                //             "비밀번호는 6자리 이상입니다."
                                //         );
                                //     }
                                // } else {
                                //     setErrorModal(true);
                                //     setErrorMessage(
                                //         "비밀번호를 한번 더 입력해주세요."
                                //     );
                                // }
                                navigation.navigate("Signup01");
                            }}
                            secureTextEntry={true}
                        />
                        <Button
                            title="회원가입하기"
                            onPress={() => {
                                navigation.navigate("Signup01");
                            }}
                        />
                    </InputContainer>
                ) : null}
            </Container>
            {errorModal ? (
                <BasicModal
                    title={errorMessage}
                    onPress={closeModal}
                    src={illust.error}
                />
            ) : null}
        </KeyboardAwareScrollView>
    );
};

export default SignupContainer00;
