import React, { useEffect, useRef, useContext } from "react";
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
import Input from "@components/Input";
import Button from "@components/Button";

import styled, { ThemeContext } from "styled-components";
import { icons20px } from "@/icons";

const InputContainer = styled.View`
    width: 100%;
    padding: 0px 20px;
    align-items: center;
`;

const TopContainer = styled.View`
    width: 100%;
    flex-direction: row;
    /* background-color: aquamarine; */
    justify-content: space-between;
    align-items: center;
`;

const TitleContainer = styled.View`
    margin: 15px 0;
`;

const Title = styled.Text`
    font-size: 18px;
    font-weight: 900;
    /* background-color: red; */
`;

const CloseBtn = styled.TouchableWithoutFeedback``;
const CloseImage = styled.Image`
    width: 20px;
    height: 20px;
    /* background-color: blue; */
`;

const Line = styled.View`
    width: ${({ width }) => width}px;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
    margin-bottom: 30px;
`;

const AlarmMenu = ({ isVisible, setIsVisible, onPress }) => {
    // const { isVisible, setIsVisible } = props;
    const theme = useContext(ThemeContext);
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
            setIsVisible(false);
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
                    <InputContainer>
                        <TopContainer>
                            <TitleContainer>
                                <Title>회원정보 수정</Title>
                            </TitleContainer>
                            <CloseBtn>
                                <CloseImage
                                    source={icons20px.bottomSheetX}
                                    resizeMode="contain"
                                />
                            </CloseBtn>
                        </TopContainer>
                        <Line width={width} />
                        <Input
                            //✨ 포커스 자체가 불가능하게 해야함
                            value="abcd1234@naver.com"
                            containerStyle={{
                                width: "100%",
                                backgroundColor: theme.line,
                            }}
                        />
                        <Input
                            placeholder="닉네임 입력"
                            // value
                            onBlur={() => {}}
                            maxLenth={10}
                            onChangeText={(text) => setName(text)}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                                // refEmail.current.focus();
                            }}
                            containerStyle={{
                                width: "100%",
                            }}
                        />
                        <Input
                            placeholder="비밀번호 입력"
                            // value
                            onBlur={() => {}}
                            maxLenth={10}
                            onChangeText={(text) => setName(text)}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                                // refEmail.current.focus();
                            }}
                            containerStyle={{
                                width: "100%",
                            }}
                        />
                        <Input
                            placeholder="비밀번호 재입력"
                            // value
                            onBlur={() => {}}
                            maxLenth={10}
                            onChangeText={(text) => setName(text)}
                            returnKeyType="done"
                            onSubmitEditing={() => {
                                // refEmail.current.focus();
                            }}
                            containerStyle={{
                                width: "100%",
                                marginBottom: 0,
                            }}
                        />
                        <Button
                            btnWrapStyle={{
                                marginTop: 30,
                                marginBottom: 20,
                            }}
                            title="저장"
                            onPress={() => {
                                onPress();
                                closeModal();
                            }}
                        />
                    </InputContainer>
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
