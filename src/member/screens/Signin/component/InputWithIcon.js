import React, { useState, forwardRef } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    height: 50px;
    background: ${({ theme }) => theme.background};
    margin-bottom: 12px;
    border: 1px solid
        ${({ theme, isFocused }) =>
            isFocused ? theme.inputPlaceholderFocus : theme.inputBorder};
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
`;

const Icon = styled.Image`
    width: 20px;
`;

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholderText,
}))`
    width: 100%;
    margin-left: 5px;
    font-size: 14px;
    padding: 16px 0;
`;

const InputWithIcon = forwardRef(
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
            icon,
            containerStyle,
        },
        ref
    ) => {
        const width = Dimensions.get("window").width;
        const [isFocused, setIsFocused] = useState(false);
        return (
            <Container
                width={width}
                isFocused={isFocused}
                style={containerStyle}
            >
                <Icon source={icon} resizeMode="contain" />
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
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={secureTextEntry}
                ></StyledInput>
            </Container>
        );
    }
);

export default InputWithIcon;
