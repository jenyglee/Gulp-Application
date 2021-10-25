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

const Category = ({ selectedItem, setSelectedItem, categoryList }) => {
    const renderItem = ({ item }) => {
        if (item.id === 10) {
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectedItem(item.id);
                }}
                style={
                    item.id === 10
                        ? {
                              paddingRight: 40,
                          }
                        : {}
                }
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
                    paddingRight: 200,
                    // marginRight: 100,
                }}
                // ListHeaderComponent={ContentThatGoesAboveTheFlatList}
                // ListFooterComponent={ContentThatGoesBelowTheFlatList}
            />
        </Container>
    );
};

export default Category;
