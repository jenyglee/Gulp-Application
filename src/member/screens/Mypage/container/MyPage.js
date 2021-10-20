import React, { useState, useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "@components/modal/BottomSheet";
import Profile from "@/member/screens/Mypage/component/Profile";
import ButtonMenu from "@/member/screens/Mypage/component/ButtonMenu";
import { GradeTable } from "@components/modal/index";
import { logout, removeUser } from "@/member/api/memberApi";
import RequireSignin from "@/common/components/RequireSignin";
import { illust } from "@/images";
import jwt_decode from "jwt-decode";

const Container = styled.View`
    width: 100%;
    height: 100%;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`;

const MyPageContainer = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [isSignin, setIsSignin] = useState(false); // 마이페이지 노출(로그인시)

    // ✨ 유저 정보 확인
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser();
        });
        return () => {
            removeFocusEvent();
        };
    }, [ButtonMenu]);

    // ✨ 로그인정보 가져오기
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        setIsSignin(token);
    };

    // ✨ 등급표 노출/숨김
    const showGradeTable = () => {
        setGradeTable(!gradeTable);
    };

    return (
        <SafeAreaView>
            {isSignin ? (
                <Container>
                    <Profile />
                    <ButtonMenu
                        showGradeTable={showGradeTable}
                        showUserInfo={() => {
                            navigation.navigate("CustomInfo");
                        }}
                        logout={logout}
                        removeUser={removeUser}
                        setIsSignin={setIsSignin}
                    />
                    {gradeTable ? (
                        <GradeTable onPress={showGradeTable} />
                    ) : null}
                </Container>
            ) : (
                <Container
                    width={width}
                    style={{
                        marginTop: 20,
                    }}
                >
                    <RequireSignin
                        src={illust.error}
                        title="로그인이 필요한 서비스입니다."
                        onPress={() => navigation.navigate("Signin")}
                    />
                </Container>
            )}
        </SafeAreaView>
    );
};

export default MyPageContainer;
