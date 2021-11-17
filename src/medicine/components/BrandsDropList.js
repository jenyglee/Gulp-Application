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

const BrandsDropList = ({ filtered, onSelectItem }) => {
    return (
        <View>
            {filtered.map((item, index) => {
                return (
                    <TouchableOpacity
                        // key={item.id}
                        key={index}
                        onPress={onSelectItem.bind(undefined, item.id)}
                        // naming convention 이름짓는
                    >
                        <View>
                            <StyledText>{item.name}</StyledText>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default BrandsDropList;
