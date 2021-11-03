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
import { inject, observer } from "mobx-react";

const Container = styled.View`
    width: 100%;
    height: ${({ height }) => height}px;
    align-items: center;
    justify-content: ${({ isSignin }) => (isSignin ? `flex-start` : `center`)};
    background-color: ${({ theme }) => theme.background};
`;

const MyPageContainer = ({ navigation }) => {
    const height = Dimensions.get("window").height;
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [isSignin, setIsSignin] = useState(true); // 마이페이지 노출(로그인시)

    // ✨ 유저 정보 확인
    useEffect(() => {
        setTasks();
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
                <Container height={height} isSignin={isSignin}>
                    <Profile />
                    <ButtonMenu
                        showGradeTable={showGradeTable}
                        showUserInfo={() => {
                            navigation.navigate("CustomInfo");
                        }}
                        logout={logout}
                        onRemoveUser={() => {
                            removeUser();
                            navigation.navigate("Signin");
                        }}
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
                        onPress={() => navigation.navigate("Signin")}
                    />
                </Container>
            )}
        </SafeAreaView>
    );
};

export default MyPageContainer;

// export default inject((stores) => ({
//     memberStore: stores.memberStore,
// }))(observer(MyPageContainer));
