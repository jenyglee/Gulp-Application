import React, { useState, useContext, useEffect, useMemo } from "react";
import { ButtonSmall, AlarmMedicine } from "@components/index";
import styled, { ThemeContext } from "styled-components";
import IconButton from "@/common/screens/AlarmList/component/IconButton";
import { icons14px } from "@/icons";
import Day from "@screens/AlarmList/component/Day";

const koreanDaysArr = ["월", "화", "수", "목", "금", "토", "일"];

const TouchContainer = styled.TouchableOpacity`
    align-items: center;
    margin-bottom: 10px;
`;

const Container = styled.View`
    width: 100%;
    height: auto;
    border-radius: 12px;
    padding: 20px;
    background-color: ${({ isNotTodayAlarm, theme }) =>
        isNotTodayAlarm ? theme.white : theme.line};
`;

const TopWrap = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const TimeContainer = styled.View`
    flex-direction: row;
`;

const Time = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${({ theme, completed, isNotTodayAlarm }) => {
        if (isNotTodayAlarm) {
            if (completed) {
                return theme.textDisable;
            } else {
                return theme.black;
            }
        } else if (!isNotTodayAlarm) {
            return theme.alarmDisabledText;
        } else return null;
    }};
`;

const Ampm = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme, completed, isNotTodayAlarm }) => {
        if (isNotTodayAlarm) {
            if (completed) {
                return theme.textDisable;
            } else {
                return theme.black;
            }
        } else if (!isNotTodayAlarm) {
            return theme.alarmDisabledText;
        } else return null;
    }};
`;

const TopWrapLeft = styled.View`
    margin-bottom: 15px;
`;

const TopWrapRight = styled.View`
    flex-direction: row;
`;

const MedicineContainer = styled.View`
    width: 100%;
    flex-direction: column;
`;

const Alarm = ({ alarmInfo, menuIcon, toggleTask, showAlarmMenu, day }) => {
    const theme = useContext(ThemeContext);
    const [alarmVisible, setAlarmVisible] = useState(true); // 알람 노출 / 미노출 (요일 맞춰서)
    const [completed, setCompleted] = useState(alarmInfo.completed); // 복용 / 미복용
    const [isNotTodayAlarm, setIsNotTodayAlarm] = useState(true); //(day 정리될때까지 임시용)
    // const [isNotTodayAlarm, setIsNotTodayAlarm] = useState(false);

    // ✨ 오늘 요일에 맞는 알람만 노출(문자열 기준으로 변경 필요)
    // useEffect(() => {
    //     if (alarmInfo.day.includes(day)) {
    //         setIsNotTodayAlarm(true);
    //     } else {
    //         setIsNotTodayAlarm(false);
    //     }
    // }, [alarmInfo]);

    // ✨ 숫자로 넘어온 요일을 한글로 변환
    // const formatNumToKoreanDay = (numberDay) =>
    //     numberDay.map((num) => koreanDaysArr[num - 1]);

    // ✨ HH:mm:dd로 들어온 시간 전환 => "14:30:30" => "PM 2:30"
    const formatStrToTimeObj = (timeStr) => {
        const [hour, minute] = timeStr.split(":").map((str) => Number(str));
        return {
            hour: hour > 12 ? hour - 12 : hour,
            minute: minute > 10 ? minute : `0${minute}`,
            ampm: hour < 12 ? "AM" : "PM",
        };
    };

    // const changedDay = useMemo(() => formatNumToKoreanDay(alarmInfo.day), []);
    const { hour, minute, ampm } = useMemo(
        () => formatStrToTimeObj(alarmInfo.time),
        []
    );

    const _onPress = () => {
        toggleTask(alarmInfo.id);
        setCompleted(!completed);
    };

    return (
        <>
            {alarmVisible ? (
                <TouchContainer onPress={_onPress}>
                    <Container isNotTodayAlarm={isNotTodayAlarm}>
                        <TopWrap>
                            <TopWrapLeft>
                                {/* <Day
                                    dayArr={changedDay}
                                    isNotTodayAlarm={isNotTodayAlarm}
                                /> */}
                                <TimeContainer>
                                    <Time
                                        completed={completed}
                                        isNotTodayAlarm={isNotTodayAlarm}
                                    >
                                        {hour}:{minute}
                                    </Time>
                                    <Ampm
                                        completed={completed}
                                        isNotTodayAlarm={isNotTodayAlarm}
                                    >
                                        {ampm}
                                    </Ampm>
                                </TimeContainer>
                            </TopWrapLeft>
                            <TopWrapRight>
                                {/* ✨ 복용, 미복용 버튼 */}
                                {isNotTodayAlarm ? (
                                    <ButtonSmall
                                        title="복용"
                                        icon={
                                            completed
                                                ? icons14px.checkWhite
                                                : icons14px.uncheck
                                        }
                                        onPress={_onPress}
                                        completed={completed}
                                    />
                                ) : null}
                                {/* ✨ 메뉴버튼 */}
                                <IconButton
                                    icon={menuIcon}
                                    id={alarmInfo.id}
                                    onPress={showAlarmMenu}
                                />
                            </TopWrapRight>
                        </TopWrap>
                        <MedicineContainer>
                            {Object.values(alarmInfo.name).map((item) => {
                                return (
                                    <AlarmMedicine
                                        completed={completed}
                                        isNotTodayAlarm={isNotTodayAlarm}
                                        name={item.name}
                                        key={item.id}
                                    />
                                );
                            })}
                        </MedicineContainer>
                    </Container>
                </TouchContainer>
            ) : null}
        </>
    );
};

export default Alarm;
