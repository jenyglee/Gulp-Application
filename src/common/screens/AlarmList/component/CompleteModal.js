import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Modal, Animated, TouchableWithoutFeedback, Dimensions, PanResponder,
} from "react-native";
import { illust } from "@/images";
import Button from "@components/modal/Button";
import styled from "styled-components";

const Wrap = styled.View`
    background-color: ${({ theme }) => theme.white};
    height: auto;
    margin-top: 30px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const TextWrap = styled.View`
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;
const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.textBasic};
    margin-bottom: 5px;
`;

const SubTitle = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.main};
`;

const StyledImage = styled.Image`
    width: ${({ width }) => width}px;
    height: 122px;
    margin-bottom: 80px;
`;

const CompleteModal = ({ isVisible, setIsVisible, count }) => {
    // const { isVisible, setIsVisible } = props;
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
        if (isVisible) {
            resetBottomSheet.start();
        }
    }, [isVisible]);

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setIsVisible(false)
        });
    };

    return (
        <Modal
            visible={isVisible}
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
                        <TextWrap>
                            <Title>오늘도 잘 챙겼어요!</Title>
                            <SubTitle>복용완료 {count}일</SubTitle>
                        </TextWrap>
                        <StyledImage
                            source={illust.complete}
                            resizeMode="contain"
                            width={width}
                        />
                        <Button onPress={closeModal} title="닫기" />
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

export default CompleteModal;
