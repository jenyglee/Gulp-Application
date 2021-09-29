import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import styled, { ThemeContext } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarTable from "@/common/screens/Calendar/component/CalendarTable";
import CalendarTitle from "@/common/screens/Calendar/component/CalendarTitle";
import CalendarTitleNotSignin from "@/common/screens/Calendar/component/CalendarTitleNotSignin";
import RequireSignin from "@/common/screens/Calendar/component/RequireSignin";
import { badge } from "@/icons";
import { illust } from "@/images";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    align-self: center;
`;

const HistoryContainer = styled.View`
    background-color: ${({ theme }) => theme.white};
    padding: 20px;
    border-radius: 12px;
`;

const Date = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const Alarm = styled.View`
    background-color: ${({ theme }) => theme.white};
    padding: 20px;
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

const Medicine = styled.Text`
    font-size: 16px;
    margin: 10px 0;
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
`;

const Calendar = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const theme = useContext(ThemeContext);
    const [tasks, setTasks] = useState({});
    const [foundMedicine, setFoundMedicine] = useState(false); // 약 리스트 유무
    const [completed, setCompleted] = useState(true); // 복용 완료 여부
    const [isSignin, setIsSignin] = useState(true); // 캘린더 노출(로그인시)

    // ✨ 로컬에서 가져오기
    const getData = async () => {
        const loadedData = await AsyncStorage.getItem("tasks");
        setTasks(JSON.parse(loadedData));

        if (Object.values(JSON.parse(loadedData)).length == 0) {
            setFoundMedicine(false);
        } else {
            setFoundMedicine(true);
        }
    };
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getData();
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    return (
        <ScrollView>
            {isSignin ? (
                <Container width={width}>
                    {/* <CalendarTitle /> */}
                    <CalendarTable tasks={tasks} />
                    <HistoryContainer>
                        <Date>8월 18일</Date>
                    </HistoryContainer>
                    {foundMedicine
                        ? Object.values(tasks).map((item) => {
                              return (
                                  <Alarm key={item.id}>
                                      <TimeContainer>
                                          <Time>오후 9시 30분</Time>
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

                                      {Object.values(item.name).map(
                                          (item, i) => {
                                              return (
                                                  <View key={i}>
                                                      {completed ? (
                                                          <Medicine
                                                              style={{
                                                                  color: theme.textBasic,
                                                              }}
                                                              key={item.id}
                                                          >
                                                              {item.name}
                                                          </Medicine>
                                                      ) : (
                                                          <Medicine
                                                              style={{
                                                                  color: theme.textDisable,
                                                              }}
                                                              key={item.id}
                                                          >
                                                              {item.name}
                                                          </Medicine>
                                                      )}

                                                      {/* //   <Medicine
                                                //       style={{
                                                //           color: theme.textDisable,
                                                //       }}
                                                //       key={item.id}
                                                //   >
                                                //       {item.name}
                                                //   </Medicine> */}
                                                      <Line />
                                                  </View>
                                              );
                                          }
                                      )}
                                  </Alarm>
                              );
                          })
                        : null}
                </Container>
            ) : (
                <Container width={width}>
                    <CalendarTitleNotSignin />
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
