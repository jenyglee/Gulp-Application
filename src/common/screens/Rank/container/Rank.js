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
    height: ${({ height }) => height}px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`;

const Wrap = styled.View`
    height: 100%;
    align-items: center;
    background-color: ${({ theme }) => theme.white};
`;

const ListContainer = styled.View`
    margin: 20px 0 50px;
    width: 100%;
`;

const Block = styled.View`
    width: ${({ width }) => width} px;
    height: 20px;
    background-color: ${({ theme }) => theme.background};
`;

const tempData = [
    { id: 1, name: "플래티넘 메가비타민c 3000", brand: "렛츠미" },
    { id: 2, name: "고려은단 메가도스C 3000 3g", brand: "고려은단" },
    { id: 3, name: "비타민C 골드플러스 파워업", brand: "고려은단" },
    { id: 4, name: "비타민C 1000", brand: "고려은단" },
    { id: 5, name: "비타민C 1000mg", brand: "종근당" },
    {
        id: 6,
        name: "메리트 C 산 3000mg 메가도스 고함량 영국산 비타민",
        brand: "휴온스",
    },
    {
        id: 7,
        name: "메리트 C&D 메가도스 고함량 영국산 비타민",
        brand: "휴온스",
    },
    {
        id: 8,
        name: "영국산100% 메가도스 비타민C3000",
        brand: "라이프케어",
    },
    {
        id: 9,
        name: "비타민C 600mg",
        brand: "뉴트리코어",
    },
    {
        id: 10,
        name: "비타민c 인디안구스베리 600mg",
        brand: "팜엔탑",
    },
    {
        id: 11,
        name: "메가 비타민C3000 울트라파인",
        brand: "바이탈스푼",
    },
];

const Ranking = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
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
        return <ListItem item={item} />;
    };
    return (
        <Container>
            {isSignin ? (
                <Wrap>
                    <Category />
                    <ListContainer width={width}>
                        <Block width={width} />
                        <FlatList
                            data={medicineList}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ListContainer>
                </Wrap>
            ) : (
                <Container
                    width={width}
                    height={height}
                    style={{
                        paddingBottom: 116,
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
