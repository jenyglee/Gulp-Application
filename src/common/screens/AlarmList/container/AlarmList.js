import React, { useState, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { icons } from "@/icons";
import AlarmMenu from "@/common/components/modal/AlarmMenu";
import Grade from "@/common/screens/AlarmList/component/Grade";
import Alarm from "@/common/screens/AlarmList/component/Alarm";
import ButtonFilter from "@/common/screens/AlarmList/component/ButtonFilter";
import FloatingButton from "@/common/screens/AlarmList/component/FloatingButton";
import NotFoundAlarms from "../component/NotFoundAlarms";
import { GradeTable } from "@components/modal/index";
import CompleteModal from "@screens/AlarmList/component/CompleteModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { stateAlarms } from "stores/alarms/alarmsSlice.js";
import actionsAlarms from "stores/alarms/alarmsActions.js";
import RequireSignin from "@/common/components/RequireSignin";
import { illust } from "@/images";

const Wrap = styled.ScrollView`
    padding-top: ${({ insets }) => insets.top}px;
    padding-bottom: ${({ insets }) => insets.bottom}px;
`;

const Container = styled.View`
    flex: 1;
    width: ${({ width }) => width - 48}px;
    padding-top: ${({ isSignin }) => (isSignin ? `0` : `53px`)};
    padding-bottom: 50px;
    background-color: ${({ theme }) => theme.background};
    align-self: center;
    justify-content: ${({ isSignin }) => (isSignin ? `flex-start` : `center`)};
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

const fromScreen = "AlarmList";

const AlarmList = ({ navigation }) => {
    const dispatch = useDispatch(); //dispatch : 해당 state 값을 수정하는 액션
    const theme = useContext(ThemeContext);
    const { year, month, date, day, alarms, count } = useSelector(stateAlarms);
    const width = Dimensions.get("window").width;
    const insets = useSafeAreaInsets();
    const [selectedTaskKey, setSelectedTaskKey] = useState();
    const [isSignin, setIsSignin] = useState(false); // 캘린더 노출(로그인시)
    const [gradeTable, setGradeTable] = useState(false); // 등급표
    const [isVisibleMenu, setIsVisibleMenu] = useState(false); // 알람메뉴 노출/숨김
    const [filtered, setFiltered] = useState(true); // 전체알람 < > 오늘알람
    const [completed, setCompleted] = useState([]);
    const [isVisibleCompleteModal, setIsVisibleCompleteModal] = useState(false); // 완료모달 노출/숨김

    // ✨ 로그인했는지 확인 + 약 추가 후 메인으로 복귀
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser(); //  로그인정보 가져오기
            setFiltered(true);
            dispatch(actionsAlarms.getAlarms(day, setCompleted));
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ✨ 로그인정보 가져오기
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            setIsSignin(token);
        } else {
            setIsSignin(false);
        }
    };

    // ✨ Today <-> All 필터링 됐을 때
    const handleAlarmFilterPress = () => {
        if (filtered) {
            dispatch(actionsAlarms.getAllAlarms()); // All :  전체 알람
        } else {
            dispatch(actionsAlarms.getAlarms(day, setCompleted)); // Today:  오늘의 알람
        }
        setFiltered(!filtered);
    };

    // ✨ 등급표 노출/숨김
    const handleGradeButtonPress = () => {
        setGradeTable(!gradeTable);
    };

    //  ✨알람메뉴 노출
    const handleAlarmMenuPress = (id) => {
        setIsVisibleMenu(true);
        setSelectedTaskKey(id);
    };

    // ✨ 알람 추가 페이지로 이동
    const handleAddAlarmPress = () => {
        navigation.navigate("AddAlarm", { fromScreen });
    };

    // ✨ 알람 변경 페이지로 이동
    const handleEditAlarmPress = (id) => {
        navigation.navigate("AddAlarm", {
            alarmId: id,
        });
        setIsVisibleMenu(false);
    };

    // ✨ 로그인 화면으로 이동
    const handleSigninButtonPress = () => {
        navigation.navigate("Signin");
    };

    // ✨ 알람 복용/미복용 토글
    const handleAlarmToggle = (index) => {
        dispatch(
            actionsAlarms.toggleAlarm({
                alarms,
                index,
                completed,
                setCompleted,
                setIsVisibleCompleteModal,
                year,
                month,
                date,
                count,
            })
        );
    };

    // ✨ 알람 삭제
    const handleAlarmDelete = () => {
        dispatch(
            actionsAlarms.deleteAlarm({
                selectedTaskKey,
                day,
                setCompleted,
            })
        );
    };

    return (
        <>
            {isSignin ? (
                <>
                    <Wrap insets={insets}>
                        <Container width={width} isSignin={isSignin}>
                            <StatusBar backgroundColor={theme.background} />
                            <Grade
                                count={count}
                                onPress={handleGradeButtonPress}
                            />
                            <TitleContainer>
                                <StyledText>내 알람</StyledText>
                                <ButtonFilter
                                    filtered={filtered}
                                    onPress={handleAlarmFilterPress}
                                />
                            </TitleContainer>

                            {alarms[0] ? (
                                Object.values(alarms).map((item, index) => {
                                    return (
                                        <Alarm
                                            alarmInfo={item}
                                            completed={completed[index]}
                                            menuIcon={icons.dot}
                                            onToggleAlarm={() =>
                                                handleAlarmToggle(index)
                                            }
                                            onShowAlarmMenu={
                                                handleAlarmMenuPress
                                            }
                                            key={item.id}
                                            filtered={filtered}
                                        />
                                    );
                                })
                            ) : (
                                <NotFoundAlarms />
                            )}

                            {gradeTable ? (
                                <GradeTable onPress={handleGradeButtonPress} />
                            ) : null}

                            <AlarmMenu
                                isVisibleMenu={isVisibleMenu}
                                setIsVisibleMenu={setIsVisibleMenu}
                                onDeleteAlarm={handleAlarmDelete}
                                onEditAlarm={handleEditAlarmPress.bind(
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
                    <FloatingButton onPress={handleAddAlarmPress} />
                </>
            ) : (
                <Container width={width} isSignin={isSignin}>
                    <RequireSignin
                        src={illust.error}
                        title="로그인이 필요한 서비스입니다."
                        onPress={handleSigninButtonPress}
                    />
                </Container>
            )}
        </>
    );
};

export default AlarmList;
