import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Notice } from "@components/index";
import { BasicModal } from "@components/modal/index";
import { illust } from "@/images";
import { removeWhiteSpace } from "@/util";

const Container = styled.View`
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.white};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentArea = styled.View`
    width: ${({ width }) => width - 48}px;
    align-items: center;
`;

const SignupContainer03 = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const messageData = [
        "비밀번호가 일치하지 않습니다.",
        "비밀번호를 전부 입력해주세요.",
    ];
    const [errorMessage, setErrorMessage] = useState("");
    const refPasswordConfirm = useRef(null);

    // ✨빈칸체크
    const confirmValue = async (password, passwordConfirm) => {
        if (password != "") {
            if (passwordConfirm != "") {
                return true;
            } else return false;
        } else return false;
    };

    // ✨ 저장하고 다음으로
    const savePassword = async () => {
        const isValue = await confirmValue(password, passwordConfirm);
        if (isValue) {
            if (password == passwordConfirm) {
                navigation.navigate("Signup04");
            } else {
                setErrorModal(true);
                setErrorMessage(messageData[0]);
            }
        } else if (!isValue) {
            setErrorModal(true);
            setErrorMessage(messageData[1]);
        }
    };

    //  ✨ 에러모달 닫기
    const closeModal = () => {
        setErrorModal(false);
    };

    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <ContentArea width={width}>
                    <Notice
                        illust={illust.character02}
                        title="비밀번호를 입력해주세요"
                        subTitle="나중에 언제든지 변경할 수 있습니다."
                    />
                    <Input
                        placeholder="비밀번호 입력"
                        value={password}
                        onBlur={() => {}}
                        maxLength={12}
                        onChangeText={(text) => {
                            const changedPassword = removeWhiteSpace(text);
                            setPassword(changedPassword);
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            refPasswordConfirm.current.focus();
                        }}
                        secureTextEntry={true}
                    />
                    <Input
                        ref={refPasswordConfirm}
                        placeholder="비밀번호 재입력"
                        value={passwordConfirm}
                        onBlur={() => {}}
                        // maxLength={12}
                        onChangeText={(text) => {
                            const changedPassword = removeWhiteSpace(text);
                            setPasswordConfirm(changedPassword);
                        }}
                        returnKeyType="done"
                        onSubmitEditing={() => {}}
                        secureTextEntry={true}
                        containerStyle={{
                            marginBottom: 30,
                        }}
                    />
                    <Button title="다음" onPress={savePassword} />
                    {errorModal ? (
                        <BasicModal
                            title={errorMessage}
                            visible={errorModal}
                            onPress={closeModal}
                            src={illust.error}
                        />
                    ) : null}
                </ContentArea>
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default SignupContainer03;
