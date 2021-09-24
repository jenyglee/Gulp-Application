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
    tint-color: ${({ theme }) => theme.black};
    /* background-color: red; */
`;

const IconButton = ({ id, icon, onPress }) => {
    const _onPress = () => {
        onPress(id);
    };
    return (
        <TouchableOpacity onPress={_onPress}>
            <Container>
                <Icon source={icon} />
            </Container>
        </TouchableOpacity>
    );
};

export default IconButton;
