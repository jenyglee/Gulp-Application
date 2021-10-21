import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    padding: 0 24px;
    width: ${({ width }) => width}px;
    /* background-color: ${({ theme }) => theme.white}; */
`;

const Circle = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin-right: 12px;
    background-color: ${({ theme }) => theme.main};
`;

const NameContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
`;

const Name = styled.Text`
    width: 90%;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.textBasic};
`;

const BrandName = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.textBasic};
    margin: 10px 0 15px 20px;
`;

const Line = styled.View`
    width: ${({ width }) => width}px;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
    position: absolute;
    bottom: 0;
`;

const ListItem = ({ item }) => {
    const width = Dimensions.get("window").width;
    return (
        <Container width={width}>
            <NameContainer>
                <Circle />
                <Name width={width}>{item.name}</Name>
            </NameContainer>
            <BrandName>{item.brand}</BrandName>
            <Line width={width} />
        </Container>
    );
};

export default ListItem;
