import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native";
// import { imageNumber } from "../images";
import { imageNumber } from "./../../images";
import { gauge } from "@/images";
import ButtonSmall from "./ButtonSmall";
import { icons14px } from "@/icons";

const Container = styled.View`
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin: 30px 0;
    width: 100%;
`;

const GaugeContainer = styled.View``;

const StyledImage = styled.Image`
    width: 100px;
    /* background-color: red; */
`;

const TextContainer = styled.View`
    /* background-color: blue; */
    align-items: flex-start;
`;

const Count = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme }) => theme.main};
`;

const GradeTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.black};
`;

const Number = styled.Image`
    width: 80%;
    height: 150px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const Grade = ({ count, onPress }) => {
    const Gauge = () => {
        if (count === 1) {
            return <StyledImage source={gauge.gauge01} resizeMode="contain" />;
        } else if (count === 2) {
            return <StyledImage source={gauge.gauge02} resizeMode="contain" />;
        } else if (count === 3) {
            return <StyledImage source={gauge.gauge03} resizeMode="contain" />;
        } else if (count === 4) {
            return <StyledImage source={gauge.gauge04} resizeMode="contain" />;
        } else if (count === 5) {
            return <StyledImage source={gauge.gauge05} resizeMode="contain" />;
        } else if (count === 6) {
            return <StyledImage source={gauge.gauge06} resizeMode="contain" />;
        } else if (count === 7) {
            return <StyledImage source={gauge.gauge07} resizeMode="contain" />;
        } else if (count === 8) {
            return <StyledImage source={gauge.gauge08} resizeMode="contain" />;
        } else if (count === 9) {
            return <StyledImage source={gauge.gauge09} resizeMode="contain" />;
        } else if (count === 10) {
            return <StyledImage source={gauge.gauge10} resizeMode="contain" />;
        } else if (count === 11) {
            return <StyledImage source={gauge.gauge11} resizeMode="contain" />;
        } else if (count === 12) {
            return <StyledImage source={gauge.gauge12} resizeMode="contain" />;
        } else if (count === 13) {
            return <StyledImage source={gauge.gauge13} resizeMode="contain" />;
        } else if (count === 14) {
            return <StyledImage source={gauge.gauge14} resizeMode="contain" />;
        }
        return <StyledImage source={gauge.gauge00} resizeMode="contain" />;
        // else if (count >= 4 && count < 5) {
        //     return <StyledImage source={gauge.gauge04} resizeMode="contain" />;
        // } else if (count >= 4 && count < 5) {
        //     return <StyledImage source={gauge.gauge04} resizeMode="contain" />;
    };

    const GradeChange = () => {
        if (count >= 5 && count < 10) {
            return <GradeTitle>내 취미는 자기관리</GradeTitle>;
        } else if (count >= 10 && count < 15) {
            return <GradeTitle>자기관리 엘리트</GradeTitle>;
        } else if (count >= 15 && count < 20) {
            return <GradeTitle>자기관리 없이는 못살아</GradeTitle>;
        } else if (count >= 20 && count < 25) {
            return <GradeTitle>일편단심 자기관리</GradeTitle>;
        } else if (count >= 25) {
            return <GradeTitle>자기관리 외길인생</GradeTitle>;
        }
        return <GradeTitle>자기관리 꿈나무 </GradeTitle>;
    };

    return (
        <Container>
            <GaugeContainer>
                {/* <StyledImage source={gauge.gauge00} resizeMode="contain" /> */}
                <Gauge />
            </GaugeContainer>
            {/* <ImageChange /> */}
            <TextContainer>
                <Count>{count}일째 꾸준히 복용중!</Count>
                <GradeChange />
                <ButtonSmall
                    title="등급표"
                    icon={icons14px.grade}
                    onPress={onPress}
                />
            </TextContainer>
        </Container>
    );
};

export default Grade;
