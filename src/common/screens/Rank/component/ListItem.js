import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    padding: 0 24px;
    width: ${({ width }) => width}px;
    /* background-color: ${({ theme }) => theme.white}; */
`;

const RankContainer = styled.View`
    width: 24px;
    margin-right: 10px;
`;

const Rank = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.main};
`;

const NameContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
`;

const Name = styled.Text`
    width: 85%;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.textBasic};
`;

const BrandName = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.textBasic};
    margin: 10px 0 15px 34px;
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
                <RankContainer>
                    <Rank>{item.id + 1}</Rank>
                </RankContainer>
                <Name width={width}>{item.name}</Name>
            </NameContainer>
            <BrandName>{item.brand}</BrandName>
            <Line width={width} />
        </Container>
    );
};

export default ListItem;
