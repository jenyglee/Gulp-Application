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
    const dispatch = useDispatch(); //dispatch : ?????? state ?????? ???????????? ??????
    const theme = useContext(ThemeContext);
    const { year, month, date, day, alarms, count } = useSelector(stateAlarms);
    const width = Dimensions.get("window").width;
    const insets = useSafeAreaInsets();
    const [selectedTaskKey, setSelectedTaskKey] = useState();
    const [isSignin, setIsSignin] = useState(false); // ????????? ??????(????????????)
    const [gradeTable, setGradeTable] = useState(false); // ?????????
    const [isVisibleMenu, setIsVisibleMenu] = useState(false); // ???????????? ??????/??????
    const [filtered, setFiltered] = useState(true); // ???????????? < > ????????????
    const [completed, setCompleted] = useState([]);
    const [isVisibleCompleteModal, setIsVisibleCompleteModal] = useState(false); // ???????????? ??????/??????

    // ??? ?????????????????? ?????? + ??? ?????? ??? ???????????? ??????
    useEffect(() => {
        const removeFocusEvent = navigation.addListener("focus", () => {
            getUser(); //  ??????????????? ????????????
            setFiltered(true);
            dispatch(actionsAlarms.getAlarms(day, setCompleted));
        });
        return () => {
            removeFocusEvent();
        };
    }, []);

    // ??? ??????????????? ????????????
    const getUser = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            setIsSignin(token);
        } else {
            setIsSignin(false);
        }
    };

    // ??? Today <-> All ????????? ?????? ???
    const handleAlarmFilterPress = () => {
        if (filtered) {
            dispatch(actionsAlarms.getAllAlarms()); // All :  ?????? ??????
        } else {
            dispatch(actionsAlarms.getAlarms(day, setCompleted)); // Today:  ????????? ??????
        }
        setFiltered(!filtered);
    };

    // ??? ????????? ??????/??????
    const handleGradeButtonPress = () => {
        setGradeTable(!gradeTable);
    };

    //  ??????????????? ??????
    const handleAlarmMenuPress = (id) => {
        setIsVisibleMenu(true);
        setSelectedTaskKey(id);
    };

    // ??? ?????? ?????? ???????????? ??????
    const handleAddAlarmPress = () => {
        dispatch(actionsAlarms.setChangingAlarmId(""));
        navigation.navigate("AddAlarm", { fromScreen });
    };

    // ??? ?????? ?????? ???????????? ??????
    const handleEditAlarmPress = (id) => {
        navigation.navigate("AddAlarm", {
            alarmId: id,
        });
        dispatch(actionsAlarms.setChangingAlarmId(id));
        setIsVisibleMenu(false);
    };

    // ??? ????????? ???????????? ??????
    const handleSigninButtonPress = () => {
        navigation.navigate("Signin");
    };

    // ??? ?????? ??????/????????? ??????
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

    // ??? ?????? ??????
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
                                <StyledText>??? ??????</StyledText>
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
                        title="???????????? ????????? ??????????????????."
                        onPress={handleSigninButtonPress}
                    />
                </Container>
            )}
        </>
    );
};

export default AlarmList;
