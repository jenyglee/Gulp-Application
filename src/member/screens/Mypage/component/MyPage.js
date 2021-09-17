import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components";
import { Profile, ButtonMenu } from "@components/index";
import { GradeTable, InputModal } from "@components/modal/index";

const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.background};
`;

const MyPage = () => {
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [userInfo, setUserInfo] = useState(false); // 회원정보

    // ✨ 등급표 노출/숨김
    const showGradeTable = () => {
        setGradeTable(!gradeTable);
    };

    // ✨ 회원정보 노출/숨김
    const showUserInfo = () => {
        setUserInfo(!userInfo);
    };

    return (
        <SafeAreaView>
            <Container>
                <Profile />
                <ButtonMenu
                    showGradeTable={showGradeTable}
                    showUserInfo={showUserInfo}
                />
                {gradeTable ? <GradeTable onPress={showGradeTable} /> : null}
                {userInfo ? <InputModal onPress={showUserInfo} /> : null}
            </Container>
        </SafeAreaView>
    );
};

export default MyPage;
