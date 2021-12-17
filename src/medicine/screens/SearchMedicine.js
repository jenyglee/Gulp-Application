import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { ButtonFloating } from "@components/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input, TextButton } from "@components/index";
import {
    BrandsDropList,
    MedicinesDropList,
    PressDropList,
    ButtonCategorySelect,
} from "@/medicine/components/index";
import { Alert, Animated, Dimensions, Platform } from "react-native";
import _ from "lodash";
import { getBrands, getMedicines } from "@/medicine/api/medicineApi";
import { useSelector, useDispatch } from "react-redux";
import { stateMedicines } from "stores/medicines/medicinesSlice";
import actionsMedicines from "stores/medicines/medicineActions";
import { stateMembers } from "stores/members/membersSlice";
import actionsMembers from "stores/members/memberActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    /* height: 100%; */
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
    /* bottom: 0; */
    bottom: 80px;
    left: 0;
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
`;

const SearchMedicine = ({ navigation }) => {
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
    const [medicineNeedSave, setMedicineNeedSave] = useState("");
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

    // ✨ 첫 진입 시 값 초기화
    useEffect(() => {
        dispatch(actionsMedicines.setMedicine(""));
        dispatch(actionsMedicines.setBrand(""));
        dispatch(actionsMedicines.setCategory({ name: "선택" }));
        setShowBrand(false);
        setShowMedicine(false);

        // 카테고리 조회 api 적용
        dispatch(actionsMembers.getUser());
        dispatch(actionsMedicines.setCategoryData(token));
    }, []);

    // ✨ '브랜드 이름' 노출
    useEffect(() => {
        if (category.name !== "선택") {
            setShowBrand(true);
            inputAnimation(opacityBrand);
        }
    }, [category]);

    // ✨ 브랜드 확인
    useEffect(() => {
        if (brandKey !== "") {
            setShowMedicine(true);
            inputAnimation(opacityMedicine);
        }
    }, [brandKey]);

    // ✨ 애니메이션 'opacity'
    const inputAnimation = (opacityItem) => {
        Animated.timing(opacityItem, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    //✨ brand 검색어 자동완성 노출
    const debounceSearchBrand = _.debounce(async (text) => {
        if (text) {
            const brands = await getBrands(text, token);
            brands ? setIsSearchingBrand(true) : setIsSearchingBrand(false);
            setFiltered(brands ?? []);
        } else {
            setIsSearchingBrand(false);
        }
    }, 300);

    // ✨ medicine 검색어 자동완성 노출
    const debounceSearchMedicine = _.debounce(async (text) => {
        if (text) {
            setIsSearchingMedicine(true);
            const medicines = await getMedicines({
                categoryKey,
                brandKey,
                medicine: text,
            });
            setFiltered(medicines ?? []);
        } else {
            setIsSearchingMedicine(false);
        }
    }, 300);

    const handleVisibleDropList = () => {
        setIsSelectingCategory(!isSelectingCategory);
    };

    return (
        <>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={{
                    // flex: 1,
                    height: "100%",
                    // alignSelf: "center",
                }}
            >
                <Container width={width}>
                    <StyledForm
                        width={width}
                        style={{
                            marginTop: 50,
                        }}
                    >
                        <StyledTitle>영양제 종류</StyledTitle>
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
                                onSelectItem={(id) => {
                                    dispatch(
                                        actionsMedicines.handleSelectCategory(
                                            categoryData,
                                            id
                                        )
                                    );
                                }}
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
                                    // marginBottom: 36,
                                }}
                            >
                                <StyledTitle>브랜드 이름</StyledTitle>
                                <Input
                                    containerStyle={{
                                        marginBottom: 0,
                                    }}
                                    value={brand}
                                    onBlur={() => {}}
                                    onChangeText={(text) =>
                                        dispatch(
                                            actionsMedicines.onSearchBrand(
                                                text,
                                                debounceSearchBrand
                                            )
                                        )
                                    }
                                    placeholder="브랜드를 입력해주세요"
                                    onSubmitEditing={() => {}}
                                    isFocusedOther={isFocusedBrand}
                                    setIsFocusedOther={setIsFocusedBrand}
                                    isSearching={isSearchingBrand}
                                    isSearchMedicine
                                />
                                {isSearchingBrand && (
                                    <BrandsDropList
                                        filtered={filtered}
                                        onSelectItem={(id) => {
                                            dispatch(
                                                actionsMedicines.handleSelectBrand(
                                                    id,
                                                    filtered,
                                                    setIsSearchingBrand,
                                                    setFiltered
                                                )
                                            );
                                        }}
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
                                    // marginBottom: 36,
                                }}
                            >
                                <StyledTitle>영양제 이름</StyledTitle>
                                <Input
                                    containerStyle={{
                                        marginBottom: 0,
                                    }}
                                    value={medicine}
                                    onBlur={() => {}}
                                    onChangeText={(text) => {
                                        dispatch(
                                            actionsMedicines.onSearchMedicine(
                                                text,
                                                debounceSearchMedicine
                                            )
                                        );
                                    }}
                                    placeholder="약 이름을 입력해주세요"
                                    isFocusedOther={isFocusedMedicine}
                                    setIsFocusedOther={setIsFocusedMedicine}
                                    isSearching={isSearchingMedicine}
                                    isSearchMedicine
                                />
                                {isSearchingMedicine && (
                                    <MedicinesDropList
                                        filtered={filtered}
                                        onSelectItem={(id) => {
                                            dispatch(
                                                actionsMedicines.handleSelectMedicine(
                                                    id,
                                                    filtered,
                                                    setIsSearchingMedicine,
                                                    setFiltered
                                                )
                                            );
                                        }}
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

                    {/* 안드로이드용 '영양제찾기/추가' 버튼 */}
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
                                title="찾으시는 영양제가 없으세요?"
                                onPress={() =>
                                    navigation.navigate("AddMedicine", {
                                        medicine,
                                    })
                                }
                            />
                            <ButtonFloating
                                btnWrapStyle={{
                                    position: "absolute",
                                    top: 628,
                                    left: 0,
                                }}
                                title="영양제 추가"
                                onPress={() => {
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
                                }}
                            />
                        </>
                    ) : null}
                </Container>

                {/* IOS용 '영양제찾기/추가' 버튼 */}
                {Platform.OS === "android" ? null : (
                    <>
                        <TextButtonContainer>
                            <Line />
                            <TextButton
                                onPress={() => {
                                    navigation.navigate("AddMedicine", {
                                        medicine,
                                    });
                                }}
                                btnStyle={{
                                    width: "100%",
                                    height: 55,
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingLeft: 24,
                                }}
                                title="찾으시는 영양제가 없으세요?"
                            />
                        </TextButtonContainer>
                        <Button
                            title="영양제 추가"
                            onPress={() => {
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
                            }}
                        />
                    </>
                )}
            </KeyboardAwareScrollView>
        </>
    );
};

export default SearchMedicine;
