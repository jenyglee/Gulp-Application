import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    flex-direction: row;
    margin-top: 25px;
`;

const CategoryWrap = styled.View`
    margin: 0 9px;
`;

const CategoryText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme, selectedItem, item }) =>
        selectedItem === item.id ? theme.main : theme.textDisable};
`;

const tempData = [
    { id: 0, title: "전체" },
    { id: 1, title: "비타민" },
    { id: 2, title: "프로바이오틱스" },
    { id: 3, title: "오메가" },
    { id: 4, title: "눈영양루테인" },
    { id: 5, title: "밀크씨슬" },
    { id: 6, title: "프로폴리스" },
    { id: 7, title: "칼슘" },
    { id: 8, title: "마그네슘" },
    { id: 9, title: "기타건강식품" },
    { id: 10, title: "쏘팔메토" },
    { id: 11, title: "보스웰리아" },
    { id: 12, title: "아연" },
    { id: 13, title: "철분" },
    { id: 14, title: "코큐텐" },
];

const Category = () => {
    const [categoryList, setCategoryList] = useState(tempData);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setSelectedItem(0);
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedItem(item.id);
                }}
            >
                <CategoryWrap>
                    <CategoryText selectedItem={selectedItem} item={item}>
                        {item.title}
                    </CategoryText>
                </CategoryWrap>
            </TouchableOpacity>
        );
    };

    return (
        <Container>
            <FlatList
                data={categoryList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                style={{
                    paddingLeft: 24,
                }}
                // ListHeaderComponent={ContentThatGoesAboveTheFlatList}
                // ListFooterComponent={ContentThatGoesBelowTheFlatList}
            />
        </Container>
    );
};

export default Category;
