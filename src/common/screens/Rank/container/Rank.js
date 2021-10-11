import React, { useState, useContext, useEffect } from "react";
import { View, Dimensions, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { ThemeContext } from "styled-components";
import ListItem from "@/common/screens/Rank/component/ListItem";
import Category from "@/common/screens/Rank/component/Category";
import RequireSignin from "@/common/components/RequireSignin";
import { illust } from "@/images";

const Container = styled.View`
    width: 100%;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`;

const ListContainer = styled.View`
    margin: 20px 0 50px;
    width: ${({ width }) => width - 48}px;
`;

const tempData = [
    { id: 1, title: "하루약속 멀티비타민" },
    { id: 2, title: "강블리 퍼스트핏 멀티비타민 미네랄" },
    { id: 3, title: "센트룸 포 우먼 멀티 비타민 미네랄" },
    { id: 4, title: "고려은단 비타민C" },
    { id: 5, title: "마이카인드 유기농 원료 비타민C" },
    { id: 6, title: "모어네이처 안심 비타민D2000" },
    { id: 7, title: "마이카인드 유기농 비타민B 컴플렉스 비타민B 컴플렉스" },
    { id: 8, title: "마이카인드 유기농 비타민B 컴플렉스 비타민B 컴플렉스" },
    { id: 9, title: "마이카인드 유기농 비타민B 컴플렉스 비타민B 컴플렉스" },
    { id: 10, title: "마이카인드 유기농 비타민B 컴플렉스 비타민B 컴플렉스" },
    { id: 11, title: "마이카인드 유기농 비타민B 컴플렉스 비타민B 컴플렉스" },
];

const Ranking = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const theme = useContext(ThemeContext);
    const [medicineList, setMedicineList] = useState(tempData);
    const [isSignin, setIsSignin] = useState(false); // 랭킹 노출(로그인시)

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser();
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ 로그인정보 가져오기
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        setIsSignin(token);
    };

    // ✨ 리스트 1~3번째는 배경색 주고 나머지는 나열
    const renderItem = ({ item }) => {
        // console.log(item.id);
        if (item.id === 1) {
            return (
                <ListItem
                    num={item.id}
                    title={item.title}
                    containerStyle={{
                        backgroundColor: theme.firstRank,
                    }}
                />
            );
        } else if (item.id === 2) {
            return (
                <ListItem
                    num={item.id}
                    title={item.title}
                    containerStyle={{
                        backgroundColor: theme.secondRank,
                    }}
                />
            );
        } else if (item.id === 3) {
            return (
                <ListItem
                    num={item.id}
                    title={item.title}
                    containerStyle={{
                        backgroundColor: theme.thirdRank,
                    }}
                />
            );
        } else {
            return (
                <ListItem
                    num={item.id}
                    title={item.title}
                    containerStyle={{
                        backgroundColor: theme.white,
                    }}
                />
            );
        }
    };
    return (
        <Container>
            <Category />
            {isSignin ? (
                <ListContainer width={width}>
                    <FlatList
                        data={medicineList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ListContainer>
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
        </Container>
    );
};

export default Ranking;
