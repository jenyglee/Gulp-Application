import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import styled, { ThemeContext } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarTable from "@/common/screens/Calendar/component/CalendarTable";
import RequireSignin from "@/common/components/RequireSignin";
import { badge } from "@/icons";
import { illust } from "@/images";
import { useSelector } from "react-redux";
import { stateCalendar } from "stores/calendar/calendarSlice";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    height: ${({ height }) => height}px;
    justify-content: ${({ isSignin }) => (isSignin ? `flex-start` : `center`)};
    align-self: center;
`;

const HistoryContainer = styled.View`
    background-color: ${({ theme }) => theme.white};
    padding: ${({ alarms }) => (alarms ? `20px 20px 0 20px` : 0)};
    border-radius: 12px;
`;

const Date = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
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
    const { historyData, selectedDate } = useSelector(stateCalendar);
    // const { alarms } = useSelector(stateAlarms);
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const [isSignin, setIsSignin] = useState(true); // 캘린더 노출(로그인시)
    const [selectedData, setSelectedData] = useState({});
    const [changedDate, setChangedDate] = useState({});

    useEffect(() => {
        historyData.map((info) => {
            if (info.date === selectedDate) {
                setSelectedData(info);
                changeDate(info.date);
            }
            return;
        });
    }, [selectedDate]);

    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser();
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

    // ✨ 날짜 변환하기
    const changeDate = (date) => {
        const arrDate = date.split("-");
        setChangedDate({
            month: arrDate[1].replace(/(^0+)/, ""),
            day: arrDate[2].replace(/(^0+)/, ""),
        });
    };

    return (
        <ScrollView>
            {isSignin ? (
                <Container width={width} height={height} isSignin={isSignin}>
                    <CalendarTable />
                    <HistoryContainer alarms={selectedData.alarms}>
                        {changedDate.month ? (
                            <Date>
                                {changedDate.month}월 {changedDate.day}일
                            </Date>
                        ) : null}
                        {selectedData.alarms
                            ? selectedData.alarms.map((alarm) => {
                                  return (
                                      <Alarm key={alarm.id}>
                                          <TimeContainer>
                                              <Time>{alarm.time}</Time>
                                              {alarm.completed ? (
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
                                          {alarm.medicines.map((medicine) => {
                                              return (
                                                  <View key={medicine.id}>
                                                      <Name>
                                                          {medicine.name}
                                                      </Name>
                                                      <Line />
                                                  </View>
                                              );
                                          })}
                                      </Alarm>
                                  );
                              })
                            : null}
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
