import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    height: 70px;
    margin: 5px;
    background-color: #fefefe;
    border: 1px solid #ddd;
`;

const StyledText = styled.Text`
    font-size: 18px;
    color: #000;
`;

const SearchDropList = ({ filtered, selectItem, searchType }) => {
    // const [name, setName] = useState([]);
    const _onPress = (id) => {
        selectItem(id);
    };

    // ✨ 브랜드 이름이 겹칠 경우를 차단
    const passSameBrand = () => {};
    return (
        <View>
            {filtered.map((item) => {
                return (
                    <TouchableOpacity key={item.id} onPress={_onPress(item.id)}>
                        <View>
                            {searchType === "name" ? (
                                <StyledText>{item.name}</StyledText>
                            ) : (
                                <StyledText>{item.brand}</StyledText>
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default SearchDropList;
