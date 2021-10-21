import React, { useState } from "react";
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

const SerchDropList = ({ filtered, onPress }) => {
    const _onPress = (id) => {
        onPress(id);
    };
    return (
        <View>
            {filtered.map((item) => {
                return (
                    <TouchableOpacity key={item.id} onPress={_onPress(item.id)}>
                        <View>
                            <StyledText>
                                {item.brand} - {item.name}
                            </StyledText>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default SerchDropList;
