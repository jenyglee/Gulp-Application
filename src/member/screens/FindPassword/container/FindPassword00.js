import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Alert, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Image } from "@components/index";
import { isEmail, removeWhiteSpace } from "@/util";

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

const ButtonContainer = styled.View`
    width: ${({ width }) => width - 48}px;
`;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const FindPasswordContainer00 = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const width = Dimensions.get("window").width;

    // ✨이메일 확인
    const confirmEmail = () => {
        if (email != "") {
            if (isEmail(email)) {
                navigation.navigate("FindPassword01");
            } else {
                Alert.alert("이메일을 올바르게 입력해주세요.");
            }
        } else {
            Alert.alert("이메일을 입력해주세요.");
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ marginTop: 25 }}
            extraScrollHeight={20}
        >
            <Container>
                <InputContainer>
                    <StyledTitle>이메일이 무엇인가요?</StyledTitle>
                    <Input
                        title="이메일"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onBlur={() => {}}
                        maxLenth={10}
                        onChangeText={(text) => {
                            const changedEmail = removeWhiteSpace(text);
                            setEmail(changedEmail);
                        }}
                        returnKeyType="done"
                        onSubmitEditing={confirmEmail}
                        containerStyle={{
                            marginBottom: 0,
                        }}
                    />
                </InputContainer>
                <ButtonContainer width={width}>
                    <Button
                        title="다음"
                        containerStyle={{
                            marginTop: 20,
                        }}
                        onPress={confirmEmail}
                    />
                </ButtonContainer>
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default FindPasswordContainer00;
