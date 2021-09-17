import React from "react";
import { TouchableOpacity } from "react-native";
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

const AutoList = ({ item, selectItem }) => {
    const _onPress = () => {
        selectItem(item.id);
    };
    return (
        <TouchableOpacity onPress={_onPress}>
            <Container>
                <StyledText>{item.name}</StyledText>
            </Container>
        </TouchableOpacity>
    );
};

export default AutoList;
