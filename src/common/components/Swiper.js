import React, { Component } from "react";
import styled from "styled-components";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";
// import { imageNumber } from "../images";
import { imageNumber } from "./../../images";

import Swiper from "react-native-swiper";

const Slide = styled.View`
    padding: 30px;
    width: 100%;
    height: 90%;
`;

const SubTitle = styled.Text`
    color: #27c47d;
    font-size: 14px;
    margin-bottom: 5px;
`;

const Title = styled.Text`
    color: #111111;
    font-size: 24px;
    font-weight: 900;
`;

const StyledImage = styled.Image`
    width: 100%;
    height: 100%;
    /* background-color: red; */
    /* opacity: 0.5; */
    position: absolute;
    top: 40px;
    align-self: center;
`;

export default class SwiperComponent extends Component {
    render() {
        // const theme = useContext(ThemeContext);
        return (
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                paginationStyle={{
                    paddingBottom: 50,
                }}
                activeDotStyle={{
                    backgroundColor: "#27c47d",
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    marginLeft: 4,
                    marginRight: 4,
                    marginTop: 0,
                    marginBottom: 0,
                }}
                dotStyle={{
                    backgroundColor: "rgba(0,0,0,.2)",
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    marginLeft: 4,
                    marginRight: 4,
                    marginTop: 0,
                    marginBottom: 0,
                }}
            >
                <Slide>
                    <SubTitle>1주일동안 꾸준히 복용 시</SubTitle>
                    <Title>자기관리 꿈나무</Title>
                    <StyledImage
                        source={imageNumber.grade01}
                        resizeMode="center"
                    />
                </Slide>
                <Slide>
                    <SubTitle>2주일동안 꾸준히 복용 시</SubTitle>
                    <Title>내 취미는 자기관리!</Title>
                    <StyledImage
                        source={imageNumber.grade02}
                        resizeMode="center"
                    />
                </Slide>
                <Slide>
                    <SubTitle>3주일동안 꾸준히 복용 시</SubTitle>
                    <Title>자기관리 엘리트</Title>
                    <StyledImage
                        source={imageNumber.grade03}
                        resizeMode="center"
                    />
                </Slide>
                <Slide>
                    <SubTitle>4주일동안 꾸준히 복용 시</SubTitle>
                    <Title>자기관리 없이는 못살아😂</Title>
                    <StyledImage
                        source={imageNumber.grade04}
                        resizeMode="center"
                    />
                </Slide>
                <Slide>
                    <SubTitle>5주일동안 꾸준히 복용 시</SubTitle>
                    <Title>일.편.단.심 자기관리</Title>
                    <StyledImage
                        source={imageNumber.grade04}
                        resizeMode="center"
                    />
                </Slide>
                <Slide>
                    <SubTitle>6주일동안 꾸준히 복용 시</SubTitle>
                    <Title>자기관리 외길인생...</Title>
                    <StyledImage
                        source={imageNumber.grade04}
                        resizeMode="center"
                    />
                </Slide>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        padding: 30,
    },
    slide2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5",
    },
    slide3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9",
    },
    text: {
        color: "#111",
        fontSize: 30,
        fontWeight: "bold",
    },
});

AppRegistry.registerComponent("myproject", () => SwiperComponent);
