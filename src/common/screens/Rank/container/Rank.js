import React, { useState, useContext, useEffect } from "react";
import { View, Dimensions, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { ThemeContext } from "styled-components";
import ListItem from "@/common/screens/Rank/component/ListItem";
import Category from "@/common/screens/Rank/component/Category";
import RequireSignin from "@/common/components/RequireSignin";
import { illust } from "@/images";
import { tempData, categoryData } from "@/common/screens/Rank/data";

import { apiGetCategory } from "@/medicine/api/medicineApi";
import { useSelector, useDispatch } from "react-redux";
import { stateMedicines } from "stores/medicines/medicinesSlice";
import actionsMedicines from "stores/medicines/medicineActions";
import { stateMembers } from "stores/members/membersSlice";
import actionsMembers from "stores/members/memberActions";

const Container = styled.View`
    width: 100%;
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
    width: ${({ width }) => width}px;
    height: 16px;
    background-color: ${({ theme }) => theme.background};
`;

const Ranking = ({ navigation }) => {
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const { token } = useSelector(stateMembers);
    const { categoryData } = useSelector(stateMedicines);
    const [medicineList, setMedicineList] = useState(tempData);
    const [isSignin, setIsSignin] = useState(false); // 랭킹 노출(로그인시)
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setSelectedItem(0);
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser();
            dispatch(actionsMedicines.setCategoryData(token));
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

    const renderItem = ({ item }) => {
        return <ListItem item={item} />;
    };
    return (
        <Container>
            {isSignin ? (
                <Wrap>
                    <Category
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        categoryData={categoryData}
                    />
                    <ListContainer width={width}>
                        <Block
                            width={width}
                            style={{
                                borderTopWidth: 1,
                                borderTopColor: "#dedede",
                            }}
                        />
                        <FlatList
                            data={medicineList[selectedItem].list}
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
