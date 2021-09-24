import React from "react";
import styled from "styled-components/native";
import { Button } from "react-native";
// import { imageNumber } from "../images";
import { imageNumber } from "./../../images";

const Container = styled.View`
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: center;
    margin: 30px 0;
    width: 100%;
`;

const Count = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.main};
`;

const GradeTitle = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${({ theme }) => theme.black};
`;

const Number = styled.Image`
    width: 80%;
    height: 150px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

const Grade = ({ count, onPress }) => {
    const ImageChange = () => {
        if (count >= 5 && count < 10) {
            return <Number source={imageNumber.grade02} />;
        } else if (count >= 10 && count < 15) {
            return <Number source={imageNumber.grade03} />;
        } else if (count >= 15 && count < 20) {
            return <Number source={imageNumber.grade04} />;
        } else if (count >= 20 && count < 25) {
            return <Number source={imageNumber.four} />;
        } else if (count >= 25) {
            return <Number source={imageNumber.four} />;
        }
        return <Number source={imageNumber.grade01} />;
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
            <ImageChange />
            <Count>{count}일째 꾸준히 복용중!</Count>
            <GradeChange />
            <Button title="등급보기" onPress={onPress} />
        </Container>
    );
};

export default Grade;
