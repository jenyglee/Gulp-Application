import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

const Wrap = styled.View`
    align-items: center;
`;

const Container = styled.View`
    background-color: ${({ theme }) => theme.white};
    width: ${({ width }) => width - 48}px;
    height: 200px;
    padding: 0 20px;
    border-radius: 12px;
    align-items: center;
`;

const ListBtn = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`;

const ListContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const ListText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.black};
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
`;

const ButtonMenu = ({
    showGradeTable,
    showUserInfo,
    logout,
    onRemoveUser,
    setIsSignin,
}) => {
    const width = Dimensions.get("window").width;

    return (
        <Wrap>
            <Container width={width}>
                <ListBtn onPress={showUserInfo}>
                    <ListContainer>
                        <ListText>회원정보 변경</ListText>
                    </ListContainer>
                </ListBtn>
                <Line />
                <ListBtn onPress={showGradeTable}>
                    <ListContainer
                        style={{
                            borderBottomWidth: 0,
                        }}
                    >
                        <ListText>등급표</ListText>
                    </ListContainer>
                </ListBtn>
                <Line />
                <ListBtn
                    onPress={() => {
                        logout();
                        setIsSignin(false);
                    }}
                >
                    <ListContainer
                        style={{
                            borderBottomWidth: 0,
                        }}
                    >
                        <ListText>로그아웃</ListText>
                    </ListContainer>
                </ListBtn>
                <Line />
                <ListBtn onPress={onRemoveUser}>
                    <ListContainer
                        style={{
                            borderBottomWidth: 0,
                        }}
                    >
                        <ListText>회원탈퇴</ListText>
                    </ListContainer>
                </ListBtn>
            </Container>
        </Wrap>
    );
};

export default ButtonMenu;
