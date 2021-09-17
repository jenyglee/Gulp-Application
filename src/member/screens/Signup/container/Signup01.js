import React, { useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Notice } from "@components/index";
import { BasicModal } from "@components/modal/index";
import { illust } from "@/images";

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

const SignupContainer01 = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const [name, setName] = useState("");
    const [errorModal, setErrorModal] = useState(false);

    // ✨빈칸체크
    const confirmValue = async (name) => {
        if (name != "") {
            return true;
        } else return false;
    };

    // ✨ 저장하고 다음으로
    const saveName = async () => {
        const bool = await confirmValue(name);
        if (bool) {
            navigation.navigate("Signup02");
        } else if (!bool) {
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
                        title="닉네임을 입력해주세요"
                        subTitle="나중에 언제든지 변경할 수 있습니다."
                    />
                    <Input
                        placeholder="닉네임 입력"
                        value={name}
                        onBlur={() => {}}
                        maxLength={7}
                        onChangeText={(text) => setName(text)}
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            refEmail.current.focus();
                        }}
                        containerStyle={{
                            marginBottom: 30,
                        }}
                    />
                    <Button title="다음" onPress={saveName} />
                    {errorModal ? (
                        <BasicModal
                            title="닉네임을 입력해주세요."
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

export default SignupContainer01;
