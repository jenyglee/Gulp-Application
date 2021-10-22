import React, { useState } from "react";
import styled from "styled-components";
import { icons20px } from "@/icons";

const BtnWrap = styled.TouchableOpacity``;

const Container = styled.View`
    flex-direction: row;
    align-items: center;
`;

const StyledText = styled.Text`
    margin-right: 3px;
    color: ${({ theme }) => theme.textSub};
`;

const StyledImage = styled.Image`
    width: 20px;
    height: 20px;
    /* background-color: red; */
`;

const ButtonFilter = ({ onPress }) => {
    const [filtered, setFiltered] = useState(false);
    const _onPress = (bool) => {
        onPress(bool);
        setFiltered(!filtered);
    };
    return (
        <>
            {filtered ? (
                <BtnWrap
                    onPress={() => {
                        _onPress(true);
                    }}
                >
                    <Container>
                        <StyledText>All</StyledText>
                        <StyledImage source={icons20px.filter} />
                    </Container>
                </BtnWrap>
            ) : (
                <BtnWrap
                    onPress={() => {
                        _onPress(false);
                    }}
                >
                    <Container>
                        <StyledText>Today</StyledText>
                        <StyledImage source={icons20px.filter} />
                    </Container>
                </BtnWrap>
            )}
        </>
    );
};

export default ButtonFilter;
