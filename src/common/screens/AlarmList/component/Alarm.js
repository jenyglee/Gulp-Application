import React, { useState, useContext, useEffect, useMemo } from "react";
import { ButtonSmall, AlarmMedicine } from "@components/index";
import styled, { ThemeContext } from "styled-components";
import IconButton from "@/common/screens/AlarmList/component/IconButton";
import { icons14px } from "@/icons";
import Day from "@screens/AlarmList/component/Day";
import { Alert } from "react-native";

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
    line-height: 25px;
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

const Alarm = ({
    alarmInfo,
    completed,
    menuIcon,
    onToggleAlarm,
    onShowAlarmMenu,
    filtered,
}) => {
    const theme = useContext(ThemeContext);
    const [alarmVisible, setAlarmVisible] = useState(true); // 알람 노출 / 미노출 (요일 맞춰서)
    const [isNotTodayAlarm, setIsNotTodayAlarm] = useState(true); //(day 정리될때까지 임시용)
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [ampm, setAmpm] = useState("");
    const [day, setDay] = useState([]);

    useEffect(() => {
        formatArrToTimeObj(alarmInfo.time);
        formatStrToDayArr(alarmInfo.day);
    }, [alarmInfo.time, alarmInfo.day]);

    // ✨ HH:mm:dd로 들어온 시간 전환 => "14:30:30" => "PM 2:30"
    const formatArrToTimeObj = (timeArr) => {
        setHour(timeArr[0] > 12 ? timeArr[0] - 12 : timeArr[0]);
        setMinute(timeArr[1] >= 10 ? timeArr[1] : `0${timeArr[1]}`);
        setAmpm(timeArr[0] < 12 ? "AM" : "PM");
    };

    // ✨ day를 배열로 변환
    const formatStrToDayArr = (dayStr) => {
        const arrDay = dayStr.split("");
        const koreanDay = [];
        arrDay.map((num) => {
            koreanDay.push(koreanDaysArr[num - 1]);
        });
        setDay(koreanDay);
    };

    const _onPress = async () => {
        filtered
            ? onToggleAlarm(alarmInfo.id)
            : Alert.alert("복용완료는 오늘의 알람(Today)에서만 가능합니다.");

        // 🍎(진행중)카운트 기능
        // const count = await apiCount()
        // setCompleted(!completed);
    };

    return (
        <>
            {alarmVisible ? (
                <TouchContainer onPress={_onPress}>
                    <Container isNotTodayAlarm={isNotTodayAlarm}>
                        <TopWrap>
                            <TopWrapLeft>
                                <Day
                                    dayArr={day}
                                    isNotTodayAlarm={isNotTodayAlarm}
                                />
                                <TimeContainer>
                                    <Time
                                        completed={
                                            completed
                                                ? completed.completed
                                                : null
                                        }
                                        isNotTodayAlarm={isNotTodayAlarm}
                                    >
                                        {hour}:{minute}
                                    </Time>
                                    <Ampm
                                        completed={
                                            completed
                                                ? completed.completed
                                                : null
                                        }
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
                                            completed && completed.completed
                                                ? icons14px.checkWhite
                                                : icons14px.uncheck
                                        }
                                        onPress={_onPress}
                                        completed={
                                            completed
                                                ? completed.completed
                                                : null
                                        }
                                    />
                                ) : null}
                                {/* ✨ 메뉴버튼 */}
                                <IconButton
                                    icon={menuIcon}
                                    id={alarmInfo.id}
                                    onPress={onShowAlarmMenu}
                                />
                            </TopWrapRight>
                        </TopWrap>
                        <MedicineContainer>
                            {alarmInfo.alarmMedicines.map((item) => {
                                return (
                                    <AlarmMedicine
                                        completed={
                                            completed
                                                ? completed.completed
                                                : null
                                        }
                                        isNotTodayAlarm={isNotTodayAlarm}
                                        name={item.medicine.name}
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
