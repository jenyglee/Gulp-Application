import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { icons } from "@/icons";
import AlarmMenu from "@/common/components/modal/AlarmMenu";
import Grade from "@/common/screens/AlarmList/component/Grade";
import Alarm from "@/common/screens/AlarmList/component/Alarm";
import TopLogo from "@/common/screens/AlarmList/component/TopLogo";
import ButtonFilter from "@/common/screens/AlarmList/component/ButtonFilter";
import { GradeTable } from "@components/modal/index";
import CompleteModal from "@screens/AlarmList/component/CompleteModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";
import { inject, observer } from "mobx-react";
// import { commonStore } from "@/stores/CommonStore";
// import { commonStore } from "@/stores/CommonStore";

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

const AlarmList = ({ navigation, alarmsStore }) => {
    const {
        alarms,
        filtered,
        setFiltered,
        isVisibleAlarm,
        deleteTask,
        handlePressAlarmFilter,
        toggleTask,
        countTotal,
        count,
        isVisibleCompleteModal,
        setIsVisibleCompleteModal,
    } = alarmsStore;

    const width = Dimensions.get("window").width;
    const insets = useSafeAreaInsets();
    const [selectedTaskKey, setSelectedTaskKey] = useState();
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [isVisibleMenu, setIsVisibleMenu] = useState(false); // 알람메뉴 노출/숨김

    // ✨ 로그인했는지 확인 + 약 추가 후 메인으로 복귀
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            setFiltered(true);
            alarmsStore.getAlarms();
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ Today <-> All 필터링 됐을 때
    useEffect(() => {
        alarmsStore.getAlarms();
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
        // 🍎
        navigation.navigate("AddAlarm", {
            alarmId: id,
        });
        setIsVisibleMenu(false);
    };

    return (
        <>
            <Wrap insets={insets}>
                <Container width={width}>
                    <StatusBar style="auto" />
                    <TopLogo />
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
                    {isVisibleAlarm ? (
                        Object.values(alarms).map((item) => {
                            return (
                                <Alarm
                                    alarmInfo={item}
                                    menuIcon={icons.dot}
                                    toggleTask={toggleTask}
                                    showAlarmMenu={showAlarmMenu}
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
                        deleteTask={deleteTask.bind(
                            null,
                            selectedTaskKey,
                            setIsVisibleMenu
                        )}
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
            <FloatingAction
                color="#27C47D"
                shadow={{
                    shadowOpacity: 0,
                    shadowOffset: {
                        width: 5,
                        height: 10,
                    },
                }}
                buttonSize={50}
                animated={false}
                showBackground={false}
                onPressMain={() => {
                    navigation.navigate("AddAlarm");
                }}
            />
        </>
    );
};

export default inject("alarmsStore")(observer(AlarmList));
// export default inject((stores) => ({
//     alarmsStore: stores.alarmsStore,
//     commonStore: stores.commonStore,
// }))(observer(AlarmList));
