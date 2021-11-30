import React, { useState, forwardRef, useRef, useEffect } from "react";
import { Dimensions, Animated } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    background: ${({ theme }) => theme.white};
    margin-bottom: 12px;
    border: 1px solid
        ${({ theme, isFocused }) =>
            isFocused ? theme.inputPlaceholderFocus : theme.inputBorder};
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
    /* opacity: ${({ opacity }) => opacity}; */
    opacity: 1;
`;

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholderText,
}))`
    width: 100%;
    margin-left: 5px;
    font-size: 14px;
    padding: 16px 0;
`;

const Input = forwardRef(
    (
        {
            placeholder,
            maxLength,
            value,
            onChangeText,
            onBlur,
            returnKeyType,
            onSubmitEditing,
            secureTextEntry,
            containerStyle,
            textStyle,
            isFocusedOther,
            setIsFocusedOther,
            isSearching,
            isSearchMedicine,
        },
        ref
    ) => {
        const width = Dimensions.get("window").width;
        const [isFocused, setIsFocused] = useState(false);

        return (
            <Container
                width={width}
                isFocused={isSearchMedicine ? isFocusedOther : isFocused}
                style={containerStyle}
            >
                <StyledInput
                    ref={ref}
                    placeholder={placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={maxLength}
                    value={value}
                    onChangeText={onChangeText}
                    isFocused={isSearchMedicine ? isFocusedOther : isFocused}
                    onFocus={() =>
                        isSearchMedicine
                            ? setIsFocusedOther(true)
                            : setIsFocused(true)
                    }
                    onBlur={() => {
                        onBlur();
                        if (!isSearchMedicine) {
                            setIsFocused(false);
                        } else if (isSearchMedicine && !isSearching) {
                            setIsFocusedOther(false);
                        }
                    }}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={secureTextEntry}
                    style={textStyle}
                ></StyledInput>
            </Container>
        );
    }
);

export default Input;
