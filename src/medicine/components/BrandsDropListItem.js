import { icons14px } from "@/icons";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    height: 48px;
    padding: 0 8px;
    border-bottom-width : 1px;
    border-bottom-color: ${({theme})=> theme.line};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const StyledImage = styled.Image`
    width: 14px;
    height: 14px;
`

const StyledText = styled.Text`
    font-size: 18px;
    color: #000;
`;

const BrandsDropListItem = ({ onSelectItem, item }) => {
    return (
        <TouchableOpacity onPress={onSelectItem.bind(undefined, item.id)} >
            <Container>
                <StyledText>{item.name}</StyledText>
                <StyledImage source={icons14px.checkLightGrey} />
            </Container>
        </TouchableOpacity>
    );
};

export default BrandsDropListItem;
