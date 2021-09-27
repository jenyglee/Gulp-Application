import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 24px 20px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.white};
    margin-bottom: 10px;
`;

const NumberContainer = styled.View`
    width: 24px;
    align-items: center;
    margin-right: 5px;
`;

const StyledNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.textSub};
`;

const StyledTitle = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.textBasic};
    margin-right: 40px;
`;

const ListItem = ({ num, title, selectItem, containerStyle }) => {
    return (
        <TouchableOpacity onPress={selectItem}>
            <Container style={containerStyle}>
                <NumberContainer>
                    <StyledNumber>{num}</StyledNumber>
                </NumberContainer>
                <StyledTitle>{title}</StyledTitle>
            </Container>
        </TouchableOpacity>
    );
};

export default ListItem;
