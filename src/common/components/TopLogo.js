import React from "react";
import styled from "styled-components";
import { logo } from "@/images";

const Container = styled.View`
    align-items: center;
`;

const LogoAndTitle = styled.Image`
    width: 75px;
    height: 25px;
    margin-bottom: 18px;
    /* background-color: red; */
`;

const TopLogo = () => {
    return (
        <Container>
            <LogoAndTitle source={logo.topLogo} resizeMode="contain" />
        </Container>
    );
};

export default TopLogo;
