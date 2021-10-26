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
    background-color: ${({ theme }) => theme.white};
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
    color: ${({ theme, completed }) =>
        completed ? theme.textDisable : theme.black};
`;

const Ampm = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme, completed }) =>
        completed ? theme.textDisable : theme.black};
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

const Alarm = ({ alarmInfo, menuIcon, toggleTask, showAlarmMenu }) => {
    const theme = useContext(ThemeContext);
    const [alarmVisible, setAlarmVisible] = useState(true); // 알람 노출 / 미노출 (요일 맞춰서)
    const [completed, setCompleted] = useState(alarmInfo.completed); // 복용 / 미복용

    // ✨ 숫자로 넘어온 요일을 한글로 변환
    const formatNumToKoreanDay = (numberDay) =>
        numberDay.map((num) => koreanDaysArr[num - 1]);

    // ✨ HH:mm:dd로 들어온 시간 전환 => "14:30:30" => "PM 2:30"
    const formatStrToTimeObj = (timeStr) => {
        const [hour, minute] = timeStr.split(":").map((str) => Number(str));
        return {
            hour: hour > 12 ? hour - 12 : hour,
            minute: minute > 10 ? minute : `0${minute}`,
            ampm: hour < 12 ? "AM" : "PM",
        };
    };

    const changedDay = useMemo(() => formatNumToKoreanDay(alarmInfo.day), []);
    const { hour, minute, ampm } = useMemo(
        () => formatStrToTimeObj(alarmInfo.time),
        []
    );

    // useEffect(() => {
    //     if (filtered === true) {
    //         // ✨오늘의 알람
    //         const date = new Date();
    //         const day = date.getDay(); // 0 : 일요일
    //         const changedDay = changeDay(day); //일요일을 0 👉 7 변환
    //         // console.log(alarmInfo.day);
    //         const result = alarmInfo.day.some((num) => {
    //             return num === changedDay;
    //         });
    //         setAlarmVisible(result);
    //     } else {
    //         // ✨모든 알람
    //         setAlarmVisible(true);
    //     }

    //     formatNumToKoreanDay();
    //     editTime();
    // }, [filtered]);

    // // ✨일요일은 7로 변환
    // const changeDay = (day) => {
    //     if (day === 0) {
    //         return 7;
    //     } else {
    //         return day;
    //     }
    // };

    // ✨오늘의 요일 출력
    // const today = () => {
    //     const date = new Date();
    //     const day = date.getDay();
    //     // 0 : 일, 1 : 월, 2 : 화, 3 : 수, 4 : 목, 5 : 금

    //     const result = alarmInfo.day.some((num) => {
    //         return num === day;
    //     });
    //     setAlarmVisible(result);
    // };

    const _onPress = () => {
        toggleTask(alarmInfo.id);
        setCompleted(!completed);
    };

    return (
        <>
            {alarmVisible ? (
                <TouchContainer onPress={_onPress}>
                    <Container>
                        {completed ? (
                            <>
                                <TopWrap>
                                    <TopWrapLeft>
                                        <Day dayArr={changedDay} />
                                        <TimeContainer>
                                            <Time completed={completed}>
                                                {hour}:{minute}
                                            </Time>
                                            <Ampm completed={completed}>
                                                {ampm}
                                            </Ampm>
                                        </TimeContainer>
                                    </TopWrapLeft>
                                    <TopWrapRight>
                                        {/* ✨ 복용, 미복용 버튼 */}
                                        <ButtonSmall
                                            title="복용"
                                            icon={icons14px.checkWhite}
                                            onPress={_onPress}
                                        />

                                        {/* ✨ 메뉴버튼 */}
                                        <IconButton
                                            icon={menuIcon}
                                            id={alarmInfo.id}
                                            onPress={showAlarmMenu}
                                        />
                                    </TopWrapRight>
                                </TopWrap>
                                <MedicineContainer>
                                    {Object.values(alarmInfo.name).map(
                                        (item) => {
                                            return (
                                                <AlarmMedicine
                                                    completed={completed}
                                                    name={item.name}
                                                    key={item.id}
                                                />
                                            );
                                        }
                                    )}
                                </MedicineContainer>
                            </>
                        ) : (
                            <>
                                <TopWrap>
                                    <TopWrapLeft>
                                        <Day dayArr={changedDay} />
                                        <TimeContainer>
                                            <Time>
                                                {hour}:{minute}
                                            </Time>
                                            <Ampm>{ampm}</Ampm>
                                        </TimeContainer>
                                    </TopWrapLeft>
                                    <TopWrapRight>
                                        {/* ✨ 복용, 미복용 버튼 */}
                                        <ButtonSmall
                                            title="미복용"
                                            icon={icons14px.uncheck}
                                            containerStyle={{
                                                backgroundColor:
                                                    theme.smallBtnBackground,
                                            }}
                                            textStyle={{
                                                color: theme.smallBtnText,
                                            }}
                                            onPress={_onPress}
                                        />

                                        {/* ✨ 메뉴버튼 */}
                                        <IconButton
                                            icon={menuIcon}
                                            id={alarmInfo.id}
                                            onPress={showAlarmMenu}
                                        />
                                    </TopWrapRight>
                                </TopWrap>
                                <MedicineContainer>
                                    {Object.values(alarmInfo.name).map(
                                        (item) => {
                                            return (
                                                <AlarmMedicine
                                                    name={item.name}
                                                    key={item.id}
                                                    completed={completed}
                                                />
                                            );
                                        }
                                    )}
                                </MedicineContainer>
                            </>
                        )}
                    </Container>
                </TouchContainer>
            ) : null}
        </>
    );
};

export default Alarm;
