import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Dimensions } from "react-native";
import Button from "@components/modal/Button";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 12px;
`;

const ContentContainer = styled.View`
    padding-top: 47px;
    padding-bottom: 97px;
    width: 100%;
    align-items: center;
`;

const StyledImage = styled.Image`
    width: 60px;
    height: 55px;
    margin-bottom: 39px;
`;

const StyledText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.deepGrey};
`;

const RequireSignin = ({ onPress, title, visible, src }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const theme = useContext(ThemeContext);

    return (
        <Container width={width}>
            <ContentContainer>
                <StyledImage source={src} resizeMode="contain" />
                <StyledText>{title}</StyledText>
            </ContentContainer>
            <Button
                onPress={onPress}
                title="로그인하기"
                buttonColor={{
                    color: theme.main,
                }}
            />
        </Container>
    );
};

export default RequireSignin;
