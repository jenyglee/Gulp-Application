import React, { useState, useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "@/member/screens/Mypage/component/Profile";
import ButtonMenu from "@/member/screens/Mypage/component/ButtonMenu";
import { GradeTable } from "@components/modal/index";
import { apiLogout, apiRemoveUser } from "@/member/api/memberApi";
import RequireSignin from "@/common/components/RequireSignin";
import { illust } from "@/images";
import { useSelector } from "react-redux";
import { stateMembers } from "stores/members/membersSlice";

const Container = styled.View`
    width: 100%;
    height: ${({ height }) => height}px;
    align-items: center;
    justify-content: ${({ isSignin }) => (isSignin ? `flex-start` : `center`)};
    background-color: ${({ theme }) => theme.background};
`;

const MyPageContainer = ({ navigation }) => {
    const height = Dimensions.get("window").height;
    const { nickname } = useSelector(stateMembers);
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [isSignin, setIsSignin] = useState(true); // 마이페이지 노출(로그인시)

    // ✨ 유저 정보 확인
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser(); //로그인정보 가져오기
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ 로그인정보 가져오기
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            setIsSignin(token);
        } else {
            setIsSignin(false);
        }
    };

    // ✨ 등급표 노출/숨김
    const showGradeTable = () => {
        setGradeTable(!gradeTable);
    };

    // ✨ 회원정보 변경 화면으로 이동
    const handleEditInfoButtonPress = () => {
        navigation.navigate("CustomInfo");
    };

    // ✨  로그인 화면으로 이동
    const handleSignInButtonPress = () => {
        navigation.navigate("Signin");
    };

    return (
        <SafeAreaView>
            {isSignin ? (
                <Container height={height} isSignin={isSignin}>
                    <Profile nickname={nickname} />
                    <ButtonMenu
                        onShowGradeTable={showGradeTable}
                        onShowUserInfo={handleEditInfoButtonPress}
                        onLogout={apiLogout}
                        onRemoveUser={apiRemoveUser}
                        setIsSignin={setIsSignin}
                    />
                    {gradeTable ? (
                        <GradeTable onPress={showGradeTable} />
                    ) : null}
                </Container>
            ) : (
                <Container
                    height={height}
                    style={{
                        paddingBottom: 200,
                    }}
                >
                    <RequireSignin
                        src={illust.error}
                        title="로그인이 필요한 서비스입니다."
                        onPress={handleSignInButtonPress}
                    />
                </Container>
            )}
        </SafeAreaView>
    );
};

export default MyPageContainer;
