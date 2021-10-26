import { icons14px } from "@/icons";
import React, { useState, forwardRef, useRef, useEffect } from "react";
import { Dimensions, Animated } from "react-native";
import styled from "styled-components";

const BtnWrap = styled.TouchableWithoutFeedback`
    flex-direction: row;
    opacity: 1;
`;
const BtnContainer = styled.View`
    background: ${({ theme }) => theme.white};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid
        ${({ theme, isFocused }) =>
            isFocused ? theme.inputPlaceholderFocus : theme.inputBorder};
    border-radius: 12px;
    padding: 0 15px;
    height: 50px;
`;

const StyledText = styled.Text`
    font-size: 14px;
    /* padding: 16px 0; */
`;

const ArrowIcon = styled.Image`
    width: 14px;
    height: 14px;
`;

const ButtonCategorySelect = ({
    value,
    containerStyle,
    textStyle,
    onVisibleDropList,
    isFocused,
    setIsFocused,
}) => {
    const width = Dimensions.get("window").width;

    return (
        <BtnWrap
            width={width}
            style={containerStyle}
            onPress={() => {
                setIsFocused(!isFocused);
                onVisibleDropList();
            }}
        >
            <BtnContainer isFocused={isFocused}>
                <StyledText>{value}</StyledText>
                <ArrowIcon
                    source={
                        isFocused ? icons14px.arrowTop : icons14px.arrowBottom
                    }
                />
            </BtnContainer>
        </BtnWrap>
    );
};

export default ButtonCategorySelect;
