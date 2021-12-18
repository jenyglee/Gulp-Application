import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { icons } from "@/icons";
import AlarmMenu from "@/common/components/modal/AlarmMenu";
import Grade from "@/common/screens/AlarmList/component/Grade";
import Alarm from "@/common/screens/AlarmList/component/Alarm";
import TopLogo from "@/common/screens/AlarmList/component/TopLogo";
import ButtonFilter from "@/common/screens/AlarmList/component/ButtonFilter";
import FloatingButton from "@/common/screens/AlarmList/component/FloatingButton";
import { GradeTable } from "@components/modal/index";
import CompleteModal from "@screens/AlarmList/component/CompleteModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { inject, observer } from "mobx-react";
import { useSelector, useDispatch } from "react-redux";
import { stateAlarms } from "stores/alarms/alarmsSlice.js";
import actionsAlarms from "stores/alarms/alarmsActions.js";
import { Button } from "@/common/components";
import { getAlarm } from "@/common/api/alarmApi";

const Wrap = styled.ScrollView`
    padding-top: ${({ insets }) => insets.top}px;
    padding-bottom: ${({ insets }) => insets.bottom}px;
`;

const Container = styled.View`
    flex: 1;
    width: ${({ width }) => width - 48}px;
    background-color: ${({ theme }) => theme.background};
    align-self: center;
    justify-content: center;
    margin-bottom: 50px;
`;

const TitleContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
`;

const StyledText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.textBasic};
`;

const ProfileName = styled.Text`
    font-size: 18px;
`;

// ✨데이터형태(참고용)
// const tempData = {
//     1: {
//         id: 1,
//         time: "08:30:20",
//         name: {
//             1: { id: 1, name: "오메가3", completed: false },
//             2: { id: 2, name: "비타민", completed: false },
//             3: { id: 3, name: "철분", completed: false },
//         },
//         day: [1, 2],
//         completed: false,
//     },

// ✨데이터형태(api)
// const tempData = [
//     {
//         id: 1,
//         time: [15, 6, 9],
//         day: "456",
//         alarmMedicines: [
//             {
//                 id: 58,
//                 medicine: {
//                     id: 1,
//                     member: null,
//                     name: "알티지 오메가3",
//                     category: {
//                         id: 3,
//                         name: "오메가",
//                     },
//                     brand: {
//                         id: 1,
//                         name: "종근당건강",
//                     },
//                 },
//             },
//         ],
//         member: {
//             email: "test@zzzz.zzz",
//             gradeId: null,
//             id: 24,
//             imgPath:
//                 "https://firebasestorage.googleapis.com/v0/b/medicine-cc1f6.appspot.com/o/face.png?alt=media",
//             nickname: "리재",
//             password:
//                 "$2a$10$ZNmNbeTBKUzsKk6qu1rcR.DwwI9IIONO1XB.j8Aj3emdD6xIfqNT2",
//         },
//     },
// ];

const AlarmList = ({ navigation, alarmsStore }) => {
    const dispatch = useDispatch(); //dispatch : 해당 state 값을 수정하는 액션
    const theme = useContext(ThemeContext);
    const { year, month, date, day, alarms, count, countTotal } =
        useSelector(stateAlarms);
    const width = Dimensions.get("window").width;
    const insets = useSafeAreaInsets();
    const [selectedTaskKey, setSelectedTaskKey] = useState();
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [isVisibleMenu, setIsVisibleMenu] = useState(false); // 알람메뉴 노출/숨김
    const [filtered, setFiltered] = useState(true); // 전체알람 < > 오늘알람
    const [isVisibleAlarm, setIsVisibleAlarm] = useState(true); // 알람 유무
    const [isVisibleCompleteModal, setIsVisibleCompleteModal] = useState(false); // 완료모달 노출/숨김
    const fromScreen = "AlarmList";

    // ✨ 로그인했는지 확인 + 약 추가 후 메인으로 복귀
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            setFiltered(true);
            dispatch(actionsAlarms.getAlarms(day));
            // dispatch(actionsAlarms.getAlarms({ filtered, day }));
            // 👀❓ 무조건 alarms가 빈 배열로 들어감
            // dispatch(actionsAlarms.confirmList(alarms))
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ Today <-> All 필터링 됐을 때
    useEffect(() => {
        if (filtered) {
            dispatch(actionsAlarms.getAlarms(day));
        } else {
            dispatch(actionsAlarms.getAllAlarms());
        }
        // 👀❓ 무조건 alarms가 빈 배열로 들어감
        // dispatch(actionsAlarms.confirmList({alarms, setIsVisibleAlarm}));
    }, [filtered]);

    // ✨ 등급표 노출/숨김
    const showGradeTable = () => {
        setGradeTable(!gradeTable);
    };

    //  ✨알람메뉴 노출/숨김
    const showAlarmMenu = (id) => {
        setIsVisibleMenu(true);
        setSelectedTaskKey(id);
    };

    // ✨ 알람 변경 페이지로 이동
    const editMedicine = (id) => {
        navigation.navigate("AddAlarm", {
            alarmId: id,
        });
        setIsVisibleMenu(false);
    };

    const handlePressAlarmFilter = () => {
        setFiltered(!filtered);
    };

    return (
        <>
            <Wrap insets={insets}>
                <Container width={width}>
                    <StatusBar backgroundColor={theme.background} />
                    {/* <TopLogo /> */}
                    <Grade
                        countTotal={countTotal}
                        count={count}
                        onPress={showGradeTable}
                    />
                    <TitleContainer>
                        <StyledText>내 알람</StyledText>
                        <ButtonFilter
                            filtered={filtered}
                            onPress={handlePressAlarmFilter}
                        />
                    </TitleContainer>

                    {/* 👀❓ day가 문자열로 만들어진 게 뻑나서 잠시 가림 */}
                    {isVisibleAlarm ? (
                        Object.values(alarms).map((item) => {
                            return (
                                <Alarm
                                    alarmInfo={item}
                                    menuIcon={icons.dot}
                                    toggleTask={(id) => {
                                        dispatch(
                                            actionsAlarms.toggleAlarm({
                                                id,
                                                filtered,
                                                day,
                                                year,
                                                month,
                                                date,
                                                count,
                                                countTotal,
                                                setIsVisibleCompleteModal,
                                            })
                                        );
                                    }}
                                    showAlarmMenu={showAlarmMenu}
                                    // day={day ? day : 7}
                                    key={item.id}
                                />
                            );
                        })
                    ) : (
                        <ProfileName>약을 추가해주세요.</ProfileName>
                    )}

                    {gradeTable ? (
                        <GradeTable onPress={showGradeTable} />
                    ) : null}

                    <AlarmMenu
                        isVisibleMenu={isVisibleMenu}
                        setIsVisibleMenu={setIsVisibleMenu}
                        deleteTask={() => {
                            dispatch(
                                actionsAlarms.deleteTask({
                                    selectedTaskKey,
                                    filtered,
                                    day,
                                })
                            );
                        }}
                        editMedicine={editMedicine.bind(
                            undefined,
                            selectedTaskKey
                        )}
                    />
                    <CompleteModal
                        isVisible={isVisibleCompleteModal}
                        setIsVisible={setIsVisibleCompleteModal}
                        count={count}
                    />
                </Container>
            </Wrap>
            <FloatingButton
                onPress={() => {
                    navigation.navigate("AddAlarm", { fromScreen });
                }}
            />
        </>
    );
};

export default inject("alarmsStore")(observer(AlarmList));
// export default inject((stores) => ({
//     alarmsStore: stores.alarmsStore,
//     // commonStore: stores.commonStore,
// }))(observer(AlarmList));
