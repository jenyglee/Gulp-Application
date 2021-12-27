import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { gauge, illust } from "@/images";
import ButtonSmall from "@components/ButtonSmall";
import { icons14px } from "@/icons";

const Container = styled.View`
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
`;

const GaugeContainer = styled.View`
    width: 50%;
    align-items: center;
`;

const StyledImage = styled.Image`
    width: 154px;
    height: 154px;
    /* background-color: red; */
`;

const MedicineIllust = styled.Image`
    position: absolute;
    top: 19px;
    width: 60px;
`;

const Count = styled.Text`
    position: absolute;
    bottom: 16px;
    color: ${({ theme }) => theme.textSub};
`;

const TextContainer = styled.View`
    width: 50%;
    align-items: flex-start;
    /* background-color: blue; */
`;

const DayCount = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.main};
`;

const GradeTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.black};
`;

const Grade = ({ count, onPress }) => {
    const theme = useContext(ThemeContext);
    const Gauge = () => {
        if (count === 1) {
            return <StyledImage source={gauge.gauge01} resizeMode="contain" />;
        } else if (count % 14 === 2) {
            return <StyledImage source={gauge.gauge02} resizeMode="contain" />;
        } else if (count % 14 === 3) {
            return <StyledImage source={gauge.gauge03} resizeMode="contain" />;
        } else if (count % 14 === 4) {
            return <StyledImage source={gauge.gauge04} resizeMode="contain" />;
        } else if (count % 14 === 5) {
            return <StyledImage source={gauge.gauge05} resizeMode="contain" />;
        } else if (count % 14 === 6) {
            return <StyledImage source={gauge.gauge06} resizeMode="contain" />;
        } else if (count % 14 === 7) {
            return <StyledImage source={gauge.gauge07} resizeMode="contain" />;
        } else if (count % 14 === 8) {
            return <StyledImage source={gauge.gauge08} resizeMode="contain" />;
        } else if (count % 14 === 9) {
            return <StyledImage source={gauge.gauge09} resizeMode="contain" />;
        } else if (count % 14 === 10) {
            return <StyledImage source={gauge.gauge10} resizeMode="contain" />;
        } else if (count % 14 === 11) {
            return <StyledImage source={gauge.gauge11} resizeMode="contain" />;
        } else if (count % 14 === 12) {
            return <StyledImage source={gauge.gauge12} resizeMode="contain" />;
        } else if (count % 14 === 13) {
            return <StyledImage source={gauge.gauge13} resizeMode="contain" />;
        }
        return <StyledImage source={gauge.gauge00} resizeMode="contain" />;
    };

    const GradeChange = () => {
        if (count >= 14 && count < 28) {
            return <GradeTitle>내 취미는 건강관리!</GradeTitle>;
        } else if (count >= 28 && count < 42) {
            return <GradeTitle>영양제 엘리트</GradeTitle>;
        } else if (count >= 42 && count < 56) {
            return <GradeTitle>영양제 없이는 못살아</GradeTitle>;
        } else if (count >= 56 && count < 70) {
            return <GradeTitle>일.편.단.심 건강관리 </GradeTitle>;
        } else if (count >= 70) {
            return <GradeTitle>건강관리 외길인생...</GradeTitle>;
        }
        return <GradeTitle>건강관리 꿈나무 </GradeTitle>;
    };

    return (
        <Container>
            <GaugeContainer>
                <Gauge />
                <MedicineIllust
                    source={illust.illustMedicine}
                    resizeMode="contain"
                />
                <Count>{count % 14} / 14</Count>
            </GaugeContainer>
            <TextContainer>
                <DayCount>{count}일째 복용중</DayCount>
                <GradeChange />
                <ButtonSmall
                    title="등급표"
                    icon={icons14px.grade}
                    onPress={onPress}
                    containerStyle={{
                        backgroundColor: theme.smallBtnBackgroundChecked,
                    }}
                    textStyle={{
                        color: theme.smallBtnTextChecked,
                    }}
                />
            </TextContainer>
        </Container>
    );
};

export default Grade;
