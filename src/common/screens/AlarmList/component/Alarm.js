import React, { useState, useContext, useEffect } from "react";
import { ButtonSmall, AlarmMedicine } from "@components/index";
import styled, { ThemeContext } from "styled-components";
import IconButton from "@/common/screens/AlarmList/component/IconButton";
import { icons14px } from "@/icons";

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

const DayContainer = styled.View`
    flex-direction: row;
`;

const Day = styled.Text`
    font-size: 12px;
    font-weight: bold;

    color: ${({ theme }) => theme.main};
`;

const MedicineContainer = styled.View`
    width: 100%;
    flex-direction: column;
`;

const Alarm = ({ alarmInfo, menuIcon, toggleTask, showAlarmMenu }) => {
    const theme = useContext(ThemeContext);
    const [completed, setCompleted] = useState(alarmInfo.completed); // 복용 / 미복용
    const [changedDay, setChangedDay] = useState([]); // 숫자 요일이 한글로 저장되는 곳
    const [time, setTime] = useState([]); // 시, 분이 저장되는 곳
    const [ampm, setAmpm] = useState(""); // AM / PM 이 저장되는 곳
    const hour = alarmInfo.time.split(":", 1); // 시 부분 👉00👈:00:00
    const minute = alarmInfo.time.substring(3, 5); // 분 부분 00:👉00👈:00

    useEffect(() => {
        numChangeDay();
        editTime();
    }, []);

    // "tasks"를 가져온다.

    // ✨ 숫자로 들어온 요일 변환 [1 ,2 ,3] => ["월", "화", "수"]
    const numChangeDay = () => {
        alarmInfo.day.map((num) => {
            switch (num) {
                case 1:
                    changedDay.push("월");
                    break;
                case 2:
                    changedDay.push("화");
                    break;
                case 3:
                    changedDay.push("수");
                    break;
                case 4:
                    changedDay.push("목");
                    break;
                case 5:
                    changedDay.push("금");
                    break;
                case 6:
                    changedDay.push("토");
                    break;
                case 7:
                    changedDay.push("일");
                    break;
            }
        });
    };

    // ✨ HH:mm:dd로 들어온 시간 전환 => "14:30:30" => "PM 2:30"
    const editTime = () => {
        const copy = [...time];
        if (hour < 12) {
            setAmpm("AM");
            if (hour < 10 && hour > 0) {
                copy.push(hour[0].substring(1, 2), minute);
                setTime(copy);
            } else if (hour >= 10) {
                copy.push(hour[0], minute);
                setTime(copy);
            } else if (hour == 0) {
                copy.push(hour[0], minute);
                setTime(copy);
            }
        } else if (hour >= 12) {
            setAmpm("PM");
            copy.push(hour[0] - 12, minute);
            setTime(copy);
        }
    };

    const _onPress = () => {
        toggleTask(alarmInfo.id);
        setCompleted(!completed);
    };

    return (
        <TouchContainer onPress={_onPress}>
            <Container>
                {completed ? (
                    <>
                        <TopWrap>
                            <TopWrapLeft>
                                <DayContainer>
                                    {changedDay.map((day) => {
                                        return <Day key={day}>{day} </Day>;
                                    })}
                                </DayContainer>
                                <TimeContainer>
                                    <Time completed={completed}>
                                        {time[0]}:{time[1]}
                                    </Time>
                                    <Ampm completed={completed}>{ampm}</Ampm>
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
                            {Object.values(alarmInfo.name).map((item) => {
                                return (
                                    <AlarmMedicine
                                        completed={completed}
                                        name={item.name}
                                        key={item.id}
                                    />
                                );
                            })}
                        </MedicineContainer>
                    </>
                ) : (
                    <>
                        <TopWrap>
                            <TopWrapLeft>
                                <DayContainer>
                                    {changedDay.map((item) => {
                                        return <Day key={item}>{item} </Day>;
                                    })}
                                </DayContainer>
                                <TimeContainer>
                                    <Time>
                                        {time[0]}:{time[1]}
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
                            {Object.values(alarmInfo.name).map((item) => {
                                return (
                                    <AlarmMedicine
                                        name={item.name}
                                        key={item.id}
                                        completed={completed}
                                    />
                                );
                            })}
                        </MedicineContainer>
                    </>
                )}
            </Container>
        </TouchContainer>
    );
};

export default Alarm;
