import React, { useState, useRef } from "react";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, Image } from "@components/index";
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

    // const createUserInfo = () => {
    //     createUser({ name, email, password });
    // };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                flex: 1,
            }}
            extraScrollHeight={20}
        >
            <Container>
                <Image url={photo} onChangePhoto={setPhoto} />
                <Input
                    title="이름"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onBlur={() => {}}
                    maxLenth={10}
                    onChangeText={(text) => setName(text)}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        refEmail.current.focus();
                    }}
                />
                <Input
                    ref={refEmail}
                    title="이메일"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onBlur={() => {}}
                    maxLenth={10}
                    onChangeText={(text) => setEmail(text)}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        refPassword.current.focus();
                    }}
                />
                <Input
                    ref={refPassword}
                    title="비밀번호"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onBlur={() => {}}
                    maxLenth={10}
                    returnKeyType="next"
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={() => {
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
                    onChangeText={(text) => setPasswordConfirm(text)}
                    onSubmitEditing={() => {}}
                    secureTextEntry={true}
                />
                <Button title="회원가입하기" onPress={() => {}} />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default SignupContainer00;
