import React, { useState, useContext } from "react";
import { ButtonSmall, AlarmMedicine } from "@components/index";
import styled, { ThemeContext } from "styled-components";
import IconButton from "@/common/screens/AlarmList/component/IconButton";
import { icons14px } from "@/icons";

const TouchContainer = styled.TouchableOpacity`
    align-items: center;
    margin-bottom: 10px;
`;

const WeekContainer = styled.View`
    flex-direction: row;
`;
const WeekDay = styled.View`
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.main};
    margin-right: 5px;
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
    color: ${({ theme, hadMedicine }) =>
        hadMedicine ? theme.textDisable : theme.black};
`;

const Ampm = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme, hadMedicine }) =>
        hadMedicine ? theme.textDisable : theme.black};
    position: absolute;
    top: 3px;
    right: -28px;
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

const Alarm = ({
    alarmInfo,
    checkIcon,
    menuIcon,
    toggleTask,
    showAlarmMenu,
}) => {
    const theme = useContext(ThemeContext);
    const [hadMedicine, setHadMedicine] = useState(false);
    const _onPress = () => {
        toggleTask(alarmInfo.id);
        setHadMedicine(!hadMedicine);
    };
    return (
        <TouchContainer onPress={_onPress}>
            <Container>
                {hadMedicine ? (
                    <>
                        <TopWrap>
                            <TopWrapLeft>
                                <DayContainer>
                                    {alarmInfo.day.map((item) => {
                                        return (
                                            <Day key={item.id}>{item.day} </Day>
                                        );
                                    })}
                                </DayContainer>
                                <TimeContainer>
                                    <Time hadMedicine={hadMedicine}>
                                        {alarmInfo.time}
                                    </Time>
                                    <Ampm hadMedicine={hadMedicine}>
                                        {alarmInfo.ampm}
                                    </Ampm>
                                </TimeContainer>
                            </TopWrapLeft>
                            <TopWrapRight>
                                {/* ✨ 복용, 미복용 버튼 */}
                                <ButtonSmall
                                    title="복용"
                                    icon={icons14px.check}
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
                                        hadMedicine={hadMedicine}
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
                                    {alarmInfo.day.map((item) => {
                                        return (
                                            <Day key={item.id}>{item.day} </Day>
                                        );
                                    })}
                                </DayContainer>
                                <TimeContainer>
                                    <Time>{alarmInfo.time}</Time>
                                    <Ampm>{alarmInfo.ampm}</Ampm>
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
