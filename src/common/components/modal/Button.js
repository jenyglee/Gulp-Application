import React, { useState } from "react";
import styled from "styled-components";

const Wrap = styled.View`
    width: 100%;
    height: auto;
    position: absolute;
    padding: 0 20px;
    bottom: 0;
    overflow: hidden;
`;

const Btn = styled.TouchableOpacity``;

const BtnContainer = styled.View`
    height: 50px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.black};
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
`;

const Button = ({ onPress, title }) => {
    return (
        <Wrap>
            <Line />
            <Btn onPress={onPress}>
                <BtnContainer>
                    <Text>{title}</Text>
                </BtnContainer>
            </Btn>
        </Wrap>
    );
};

export default Button;
