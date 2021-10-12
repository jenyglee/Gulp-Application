import React, { useState, forwardRef, useRef, useEffect } from "react";
import { Dimensions, Animated } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    height: 50px;
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
        },
        ref
    ) => {
        const width = Dimensions.get("window").width;
        const [isFocused, setIsFocused] = useState(false);

        const opacity = useRef(new Animated.Value(0)).current;
        useEffect(() => {
            Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }, []);

        return (
            <Container
                width={width}
                isFocused={isFocused}
                style={containerStyle}
                // opacity={opacity}
            >
                <StyledInput
                    ref={ref}
                    placeholder={placeholder}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={maxLength}
                    value={value}
                    onChangeText={onChangeText}
                    isFocused={isFocused}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={secureTextEntry}
                ></StyledInput>
            </Container>
        );
    }
);

export default Input;
