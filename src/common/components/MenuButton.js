import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Container = styled.View`
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
`;

const MenuIcon = () => {
    return (
        <MaterialCommunityIcons name="dots-vertical" size={28} color="black" />
    );
};

const MenuButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Container>
                <MenuIcon />
            </Container>
        </TouchableOpacity>
    );
};

export default MenuButton;
