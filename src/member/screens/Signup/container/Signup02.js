import React, { useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Notice } from "@components/index";
import { BasicModal } from "@components/modal/index";
import { illust } from "@/images";
import { isEmail, removeWhiteSpace } from "@/util";

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

const SignupContainer02 = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const [email, setEmail] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // ✨ 이메일 공백제거, 유효성 검사
    const _handleEmail = (email) => {
        const changedEmail = removeWhiteSpace(email);
        setEmail(changedEmail);
        if (changedEmail) {
            setErrorMessage(
                isEmail(changedEmail) ? "" : "이메일을 정확하게 입력해주세요."
            );
        } else {
            setErrorMessage("");
        }
    };

    // ✨빈칸체크
    const confirmValue = async (email) => {
        if (email != "") {
            return true;
        } else return false;
    };

    // ✨ 저장하고 다음으로
    const saveEmail = async () => {
        const isEmail = await confirmValue(email);
        if (isEmail == true) {
            if (errorMessage == "") {
                navigation.navigate("Signup03");
            } else {
                setErrorModal(true);
            }
        } else if (isEmail == false) {
            setErrorMessage("이메일을 입력해주세요.");
            setErrorModal(true);
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
                        title="이메일을 입력해주세요"
                        // subTitle="나중에 언제든지 변경할 수 있습니다."
                    />
                    <Input
                        placeholder="이메일 입력"
                        value={email}
                        onBlur={() => {}}
                        // maxLength={10}
                        onChangeText={(text) => _handleEmail(text)}
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            refEmail.current.focus();
                        }}
                        containerStyle={{
                            marginBottom: 30,
                        }}
                    />
                    <Button title="다음" onPress={saveEmail} />
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

export default SignupContainer02;
