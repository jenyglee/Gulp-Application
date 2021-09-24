import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import IconButton from "./IconButton";

const TouchContainer = styled.TouchableOpacity`
    align-items: center;
    margin-bottom: 10px;
`;
const Container = styled.View`
    width: 100%;
`;
const TimeContainer = styled.View`
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    background-color: ${({ theme }) => theme.white};
`;

const Time = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${({ theme }) => theme.black};
`;

const ItemContainer = styled.View`
    width: 100%;
    height: auto;
    border: 1px solid #ccc;
    flex-direction: column;
    padding: 20px;
    background-color: ${({ theme }) => theme.white};
`;

const Alarm = ({ item, checkIcon, menuIcon, toggleTask, showAlarmMenu }) => {
    return (
        <TouchContainer>
            <Container>
                <TimeContainer>
                    <Time>{item.alarm}</Time>
                    {/* ✨ 메뉴버튼 */}
                    <IconButton
                        icon={menuIcon}
                        id={item.id}
                        onPress={showAlarmMenu}
                    />
                </TimeContainer>
                <ItemContainer>
                    {Object.values(item.name).map((item) => {
                        return (
                            <IconButton
                                name={item.name}
                                // icon={checkIcon}
                                onPress={toggleTask}
                                id={item.id}
                                key={item.id}
                            />
                        );
                    })}
                </ItemContainer>
                {/* <ItemContainer>
            </ItemContainer> */}
            </Container>
        </TouchContainer>
    );
};

export default Alarm;
