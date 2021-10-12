import React, { useContext } from "react";
import { Modal, Dimensions } from "react-native";
import styled, { ThemeContext } from "styled-components";
import Button from "./Button";
import { Input } from "./../index";

const OpacityBackground = styled.View`
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: absolute;
`;

const Wrap = styled.View`
    position: relative;
    /* top: ${({ height }) => height / 10000}px; */
    top: 0;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    background-color: ${({ theme }) => theme.white};
    width: ${({ width }) => width - 48}px;
    border-radius: 12px;
    align-items: center;
`;

const InputContainer = styled.View`
    width: 100%;
    padding: 30px 20px 90px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 20px;
`;

const InputModal = ({ onPress }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const theme = useContext(ThemeContext);
    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <OpacityBackground />
            <Wrap height={height}>
                <ModalContainer width={width}>
                    <InputContainer>
                        <Title>회원정보 수정</Title>
                        <Input
                            //✨ 포커스 자체가 불가능하게 해야함
                            value="abcd1234@naver.com"
                            containerStyle={{
                                width: "100%",
                                backgroundColor: theme.line,
                            }}
                        />
                        <Input
                            placeholder="닉네임 입력"
                            // value
                            onBlur={() => {}}
                            maxLenth={10}
                            onChangeText={(text) => setName(text)}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                                // refEmail.current.focus();
                            }}
                            containerStyle={{
                                width: "100%",
                            }}
                        />
                        <Input
                            placeholder="비밀번호 입력"
                            // value
                            onBlur={() => {}}
                            maxLenth={10}
                            onChangeText={(text) => setName(text)}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                                // refEmail.current.focus();
                            }}
                            containerStyle={{
                                width: "100%",
                            }}
                        />
                        <Input
                            placeholder="비밀번호 재입력"
                            // value
                            onBlur={() => {}}
                            maxLenth={10}
                            onChangeText={(text) => setName(text)}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                                // refEmail.current.focus();
                            }}
                            containerStyle={{
                                width: "100%",
                                marginBottom: 0,
                            }}
                        />
                    </InputContainer>

                    <Button title="저장" onPress={onPress} />
                </ModalContainer>
            </Wrap>
        </Modal>
    );
};

export default InputModal;
