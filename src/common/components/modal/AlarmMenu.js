import React, { useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
} from "react-native";
import styled from "styled-components";

const Wrap = styled.View`
    background-color: ${({ theme }) => theme.white};
    height: 120px;
    padding: 0 20px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const ListBtn = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
    justify-content: center;
`;
const ListContainer = styled.View`
    width: 100%;

    justify-content: center;
    align-items: center;
`;
const ListText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.black};
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
`;
const AlarmMenu = ({
    isVisibleMenu,
    setIsVisibleMenu,
    editMedicine,
    deleteTask,
}) => {
    // const { isVisibleMenu, setIsVisibleMenu } = props;
    const width = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderMove: (event, gestureState) => {
                panY.setValue(gestureState.dy);
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dy > 0 && gestureState.vy > 1.5) {
                    closeModal();
                } else {
                    resetBottomSheet.start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (isVisibleMenu) {
            resetBottomSheet.start();
        }
    }, [isVisibleMenu]);

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setIsVisibleMenu(false);
        });
    };

    return (
        <Modal
            visible={isVisibleMenu}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{
                        ...styles.bottomSheetContainer,
                        transform: [{ translateY: translateY }],
                    }}
                    {...panResponders.panHandlers}
                >
                    <Wrap>
                        <ListBtn
                            onPress={() => {
                                editMedicine();
                                closeModal();
                            }}
                        >
                            <ListContainer>
                                <ListText>알람 변경</ListText>
                            </ListContainer>
                        </ListBtn>
                        <Line />
                        <ListBtn
                            onPress={() => {
                                deleteTask();
                                closeModal();
                            }}
                        >
                            <ListContainer>
                                <ListText>지우기</ListText>
                            </ListContainer>
                        </ListBtn>
                    </Wrap>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: "auto",
        backgroundColor: "white",
        // paddingTop: 24,
        paddingBottom: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
});

export default AlarmMenu;
