import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Icon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 10px;
    tint-color: #000;
`;

const ItemName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.black};
`;

const IconButton = ({ id, icon, onPress, name }) => {
    const _onPress = () => {
        onPress(id);
    };
    return (
        <TouchableOpacity onPress={_onPress}>
            <Container>
                <ItemName>{name}</ItemName>
                {/* <Icon source={icon} /> */}
            </Container>
        </TouchableOpacity>
    );
};

export default IconButton;
