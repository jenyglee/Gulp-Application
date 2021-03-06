import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { ButtonFloating } from "@components/index";
import { Button, Input, TextButton } from "@components/index";
import {
    BrandsDropList,
    MedicinesDropList,
    PressDropList,
    ButtonCategorySelect,
} from "@/medicine/components/index";
import { Animated, Dimensions, Platform, LogBox } from "react-native";
import _ from "lodash";
import { apiGetBrands, apiGetMedicines } from "@/medicine/api/medicineApi";
import { useSelector, useDispatch } from "react-redux";
import { stateMedicines } from "stores/medicines/medicinesSlice";
import actionsMedicines from "stores/medicines/medicineActions";
import { stateMembers } from "stores/members/membersSlice";
import actionsMembers from "stores/members/memberActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    align-self: center;
    display: flex;
    align-items: center;
    position: relative;
`;

const StyledForm = styled.View`
    width: 100%;
    margin-bottom: 36px;
`;

const StyledTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const TextButtonContainer = styled.View`
    width: 100%;
    position: absolute;
    bottom: 80px;
    left: 0;
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
`;

const SearchMedicine = ({ navigation, routr }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const theme = useContext(ThemeContext);
    const {
        categoryData,
        category,
        categoryKey,
        brand,
        brandKey,
        medicine,
        medicineList,
    } = useSelector(stateMedicines);
    const { token } = useSelector(stateMembers);
    const [filtered, setFiltered] = useState([]);
    const [showBrand, setShowBrand] = useState(false);
    const [showMedicine, setShowMedicine] = useState(false);
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    const [isSearchingBrand, setIsSearchingBrand] = useState(false);
    const [isSearchingMedicine, setIsSearchingMedicine] = useState(false);
    const [isFocusedBrand, setIsFocusedBrand] = useState(false);
    const [isFocusedMedicine, setIsFocusedMedicine] = useState(false);
    const fromScreen = "SearchMedicine";

    const opacityBrand = useRef(new Animated.Value(0)).current;
    const opacityMedicine = useRef(new Animated.Value(0)).current;

    // ??? ??? ?????? ??? ??? ?????????
    useEffect(() => {
        dispatch(actionsMedicines.setMedicine(""));
        dispatch(actionsMedicines.setBrand(""));
        dispatch(actionsMedicines.setCategory({ name: "??????" }));
        setShowBrand(false);
        setShowMedicine(false);

        // ???????????? ?????? api ??????
        dispatch(actionsMembers.getUser());
        dispatch(actionsMedicines.setCategoryData(token));

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }, []);

    // ??? '????????? ??????' ??????
    useEffect(() => {
        if (category.name !== "??????") {
            setShowBrand(true);
            inputAnimation(opacityBrand);
        }
    }, [category]);

    // ??? ????????? ??????
    useEffect(() => {
        if (brandKey !== "") {
            setShowMedicine(true);
            inputAnimation(opacityMedicine);
        }
    }, [brandKey]);

    // ??? ??????????????? 'opacity'
    const inputAnimation = (opacityItem) => {
        Animated.timing(opacityItem, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    //??? brand ????????? ???????????? ??????
    const debounceSearchBrand = _.debounce(async (text) => {
        if (text) {
            const brands = await apiGetBrands(text, token);
            brands ? setIsSearchingBrand(true) : setIsSearchingBrand(false);
            setFiltered(brands ?? []);
        } else {
            setIsSearchingBrand(false);
        }
    }, 300);

    // ??? medicine ????????? ???????????? ??????
    const debounceSearchMedicine = _.debounce(async (text) => {
        if (text) {
            setIsSearchingMedicine(true);
            const medicines = await apiGetMedicines({
                categoryKey,
                brandKey,
                medicine: text,
            });
            setFiltered(medicines ?? []);
        } else {
            setIsSearchingMedicine(false);
        }
    }, 300);

    // ??? ??????????????? ??????
    const handleVisibleDropList = () => {
        setIsSelectingCategory(!isSelectingCategory);
    };

    // ??? ???????????? ??? ?????? ??????
    const handleSelectCategoryItemPress = (id) => {
        dispatch(actionsMedicines.selectCategory(categoryData, id));
    };

    // ??? ???????????? ?????? ??? ????????????
    const handleBrandInputWrite = (text) => {
        dispatch(actionsMedicines.searchBrand(text, debounceSearchBrand));
    };

    // ???????????????????????? ????????? ??????
    const handleBrandDropListItemPress = (id) => {
        dispatch(
            actionsMedicines.selectBrand(
                id,
                filtered,
                setIsSearchingBrand,
                setFiltered
            )
        );
    };

    // ??? ????????????????????? ????????? ??????
    const handleMedicineInputWrite = (text) => {
        dispatch(actionsMedicines.searchMedicine(text, debounceSearchMedicine));
    };

    // ???????????????????????? ????????? ??????
    const handleMedicineDropListItemPress = (id) => {
        dispatch(
            actionsMedicines.selectMedicine(
                id,
                filtered,
                setIsSearchingMedicine,
                setFiltered
            )
        );
    };

    // ??? ????????? ????????????
    const handleSaveButtonPress = () => {
        dispatch(
            actionsMedicines.saveMedicine(
                category,
                brand,
                brandKey,
                categoryKey,
                medicine,
                medicineList,
                navigation,
                fromScreen
            )
        );
    };

    // ??? ????????? ???????????? ???????????? ??????
    const handleAddMedicineButtonPress = () => {
        navigation.navigate("AddMedicine", {
            medicine,
        });
    };

    return (
        <>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <Container width={width}>
                    <StyledForm
                        width={width}
                        style={{
                            marginTop: 50,
                        }}
                    >
                        <StyledTitle>????????? ??????</StyledTitle>
                        <ButtonCategorySelect
                            containerStyle={{
                                marginBottom: 0,
                            }}
                            value={category.name}
                            onVisibleDropList={handleVisibleDropList}
                            isFocused={isFocusedCategory}
                            setIsFocused={setIsFocusedCategory}
                        />
                        {isSelectingCategory && (
                            <PressDropList
                                filtered={filtered}
                                onSelectItem={(id) =>
                                    handleSelectCategoryItemPress(id)
                                }
                                onVisibleDropList={handleVisibleDropList}
                                categoryData={categoryData}
                                isFocused={isFocusedCategory}
                                setIsFocused={setIsFocusedCategory}
                            />
                        )}
                    </StyledForm>
                    <StyledForm>
                        {showBrand ? (
                            <Animated.View
                                style={{
                                    width: "100%",
                                    opacity: opacityBrand,
                                }}
                            >
                                <StyledTitle>????????? ??????</StyledTitle>
                                <Input
                                    containerStyle={{
                                        marginBottom: 0,
                                    }}
                                    value={brand}
                                    onBlur={() => {}}
                                    onChangeText={(text) =>
                                        handleBrandInputWrite(text)
                                    }
                                    placeholder="???????????? ??????????????????"
                                    onSubmitEditing={() => {}}
                                    isFocusedOther={isFocusedBrand}
                                    setIsFocusedOther={setIsFocusedBrand}
                                    isSearching={isSearchingBrand}
                                    isSearchMedicine
                                />
                                {isSearchingBrand && (
                                    <BrandsDropList
                                        filtered={filtered}
                                        onSelectItem={(id) =>
                                            handleBrandDropListItemPress(id)
                                        }
                                        setIsFocusedBrand={setIsFocusedBrand}
                                        navigation={navigation}
                                    />
                                )}
                            </Animated.View>
                        ) : null}
                    </StyledForm>
                    <StyledForm>
                        {showMedicine ? (
                            <Animated.View
                                style={{
                                    width: "100%",
                                    opacity: opacityMedicine,
                                }}
                            >
                                <StyledTitle>????????? ??????</StyledTitle>
                                <Input
                                    containerStyle={{
                                        marginBottom: 0,
                                    }}
                                    value={medicine}
                                    onBlur={() => {}}
                                    onChangeText={(text) =>
                                        handleMedicineInputWrite(text)
                                    }
                                    placeholder="??? ????????? ??????????????????"
                                    isFocusedOther={isFocusedMedicine}
                                    setIsFocusedOther={setIsFocusedMedicine}
                                    isSearching={isSearchingMedicine}
                                    isSearchMedicine
                                />
                                {isSearchingMedicine && (
                                    <MedicinesDropList
                                        filtered={filtered}
                                        onSelectItem={(id) =>
                                            handleMedicineDropListItemPress(id)
                                        }
                                        setIsFocusedMedicine={
                                            setIsFocusedMedicine
                                        }
                                        medicine={medicine}
                                        navigation={navigation}
                                    />
                                )}
                            </Animated.View>
                        ) : null}
                    </StyledForm>

                    {/* ?????????????????? '???????????????/??????' ?????? */}
                    {Platform.OS === "android" ? (
                        <>
                            <ButtonFloating
                                btnWrapStyle={{
                                    position: "absolute",
                                    top: 573,
                                    left: 0,
                                }}
                                containerStyle={{
                                    backgroundColor: theme.btnBackgroundWhite,
                                    borderColor: theme.line,
                                    borderWidth: 1,
                                }}
                                textStyle={{
                                    color: theme.main,
                                }}
                                title="???????????? ???????????? ?????????????"
                                onPress={handleAddMedicineButtonPress}
                            />
                            <ButtonFloating
                                btnWrapStyle={{
                                    position: "absolute",
                                    top: 628,
                                    left: 0,
                                }}
                                title="????????? ??????"
                                onPress={handleSaveButtonPress}
                            />
                        </>
                    ) : null}
                </Container>

                {/* IOS??? '???????????????/??????' ?????? */}
                {Platform.OS === "android" ? null : (
                    <>
                        <TextButtonContainer>
                            <Line />
                            <TextButton
                                onPress={handleAddMedicineButtonPress}
                                btnStyle={{
                                    width: "100%",
                                    height: 55,
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingLeft: 24,
                                }}
                                title="???????????? ???????????? ?????????????"
                            />
                        </TextButtonContainer>
                        <Button
                            title="????????? ??????"
                            onPress={handleSaveButtonPress}
                        />
                    </>
                )}
            </KeyboardAwareScrollView>
        </>
    );
};

export default SearchMedicine;
