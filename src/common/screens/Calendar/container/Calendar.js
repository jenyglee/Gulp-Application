import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import styled, { ThemeContext } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarTable from "@/common/screens/Calendar/component/CalendarTable";
import RequireSignin from "@/common/components/RequireSignin";
import { badge } from "@/icons";
import { illust } from "@/images";
import { useSelector, useDispatch } from "react-redux";
import { stateCalendar } from "stores/calendar/calendarSlice";
import actionsCalendar from "stores/calendar/calendarActions";
import { stateAlarms } from "@/stores/alarms/alarmsSlice";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    height: ${({ height }) => height}px;
    justify-content: ${({ isSignin }) => (isSignin ? `flex-start` : `center`)};
    align-self: center;
`;

const HistoryContainer = styled.View`
    background-color: ${({ theme }) => theme.white};
    padding: 20px 20px 0 20px;
    border-radius: 12px;
`;

const Date = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const Alarm = styled.View`
    background-color: ${({ theme }) => theme.white};
    padding: 20px 0;
`;

const TimeContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

const Time = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.textBasic};
    margin-right: 5px;
`;

const CompleteBadge = styled.Image`
    width: 39px;
    height: 19px;
`;

const NotCompleteBadge = styled.Image`
    width: 49px;
    height: 19px;
`;

const Name = styled.Text`
    font-size: 16px;
    margin: 10px 0;
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
`;

const Calendar = ({ navigation }) => {
    const dispatch = useDispatch();
    const { alarms } = useSelector(stateAlarms);
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const theme = useContext(ThemeContext);
    const [alarm, setAlarm] = useState({});
    const [foundMedicine, setFoundMedicine] = useState(true); // 약 리스트 유무
    const [completed, setCompleted] = useState(true); // 복용 완료 여부
    const [isSignin, setIsSignin] = useState(true); // 캘린더 노출(로그인시)

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            // dispatch(actionsCalendar.getData(setAlarm, setFoundMedicine));
            getUser();
            console.log("=========86");
            console.log(alarms);
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ 로그인정보 가져오기
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        setIsSignin(token);
    };

    return (
        <ScrollView>
            {isSignin ? (
                <Container width={width} height={height} isSignin={isSignin}>
                    <CalendarTable />
                    <HistoryContainer>
                        <Date>8월 18일</Date>
                        {alarms.map((alarm) => {
                            return (
                                <Alarm key={alarm.id}>
                                    <TimeContainer>
                                        <Time>
                                            {alarm.time[0]}
                                            {alarm.time[1]}
                                            {alarm.time[2]}
                                        </Time>
                                        {completed ? (
                                            <CompleteBadge
                                                source={badge.complete}
                                                resizeMode="contain"
                                            />
                                        ) : (
                                            <NotCompleteBadge
                                                source={badge.notComplete}
                                                resizeMode="contain"
                                            />
                                        )}
                                    </TimeContainer>
                                    {alarm.alarmMedicines.map((medicine) => {
                                        return (
                                            <View key={medicine.id}>
                                                <Name>
                                                    {medicine.medicine.name}
                                                </Name>
                                                <Line />
                                            </View>
                                        );
                                    })}
                                </Alarm>
                            );
                        })}
                    </HistoryContainer>
                </Container>
            ) : (
                <Container
                    width={width}
                    height={height}
                    style={{
                        paddingBottom: 200,
                    }}
                >
                    {/* <CalendarTitleNotSignin /> */}
                    <RequireSignin
                        src={illust.error}
                        title="로그인이 필요한 서비스입니다."
                        onPress={() => navigation.navigate("Signin")}
                    />
                </Container>
            )}
        </ScrollView>
    );
};

export default Calendar;
