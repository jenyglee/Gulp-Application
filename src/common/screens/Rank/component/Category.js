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

const Category = ({ selectedItem, setSelectedItem, categoryData }) => {
    console.log(categoryData);
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
                        {item.name}
                    </CategoryText>
                </CategoryWrap>
            </TouchableOpacity>
        );
    };

    return (
        <Container>
            <FlatList
                data={categoryData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                style={{
                    paddingLeft: 24,
                    paddingRight: 200,
                    // marginRight: 100,
                }}
            />
        </Container>
    );
};

export default Category;
