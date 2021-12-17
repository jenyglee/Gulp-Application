import React from "react";
import styled from "styled-components";
// import {TouchableOpacity } from "react-native";

const Wrap = styled.TouchableOpacity`
    position: absolute;
    bottom: 25px;
    right: 25px;
`;
const PlusWrap = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.main};
`;
const Width = styled.View`
    width: 23px;
    height: 3px;
    position: absolute;
    background-color: ${({ theme }) => theme.white};
`;
const Length = styled.View`
    width: 3px;
    height: 23px;
    position: absolute;
    background-color: ${({ theme }) => theme.white};
`;

const FloatingButton = ({ onPress }) => {
    return (
        <Wrap onPress={onPress}>
            <PlusWrap>
                <Width></Width>
                <Length></Length>
            </PlusWrap>
        </Wrap>
    );
};

export default FloatingButton;
