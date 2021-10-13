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
import Button from "./Button";

const Wrap = styled.View`
    position: relative;
    top: 0;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    background-color: ${({ theme }) => theme.white};
    /* width: ${({ width }) => width - 48}px; */
    height: 150px;
    padding: 0 20px;
    border-radius: 12px;
    align-items: center;
`;

const ListBtn = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`;
const ListContainer = styled.View`
    width: 100%;
    height: 100%;
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
const BottomSheet = ({
    modalVisible,
    setModalVisible,
    editMedicine,
    deleteTask,
    showAlarmMenu,
}) => {
    // const { modalVisible, setModalVisible } = props;
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
        if (modalVisible) {
            resetBottomSheet.start();
        }
    }, [modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setModalVisible(false);
        });
    };

    return (
        <Modal
            visible={modalVisible}
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
                        <ModalContainer width={width}>
                            <ListBtn onPress={editMedicine}>
                                <ListContainer>
                                    <ListText>알람 변경</ListText>
                                </ListContainer>
                            </ListBtn>
                            <Line />
                            <ListBtn onPress={deleteTask}>
                                <ListContainer>
                                    <ListText>지우기</ListText>
                                </ListContainer>
                            </ListBtn>
                        </ModalContainer>
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
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

export default BottomSheet;
