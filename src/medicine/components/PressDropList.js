import React from "react";
import styled from "styled-components";
import { FlatList, TouchableOpacity } from "react-native";

const Container = styled.View`
    width: 100%;
    height: 160px;
    border-radius: 12px;
    padding: 0 15px;
    margin-top: 5px;
    border: ${({ theme }) => `1px solid ${theme.inputPlaceholderFocus}`};
`;

const StyledText = styled.Text`
    padding: 8px 0;
`;

const PressDropList = ({
    onSelectItem,
    categoryData,
    onVisibleDropList,
    isFocused,
    setIsFocused,
}) => {
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    onSelectItem(item.id);
                    onVisibleDropList();
                    setIsFocused(!isFocused);
                }}
            >
                <StyledText>{item.title}</StyledText>
            </TouchableOpacity>
        );
    };
    return (
        <Container>
            <FlatList
                style={{
                    marginTop: 10,
                }}
                data={categoryData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </Container>
    );
};

export default PressDropList;
