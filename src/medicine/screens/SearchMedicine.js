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
import { Alert, Animated, Dimensions, Platform, LogBox } from "react-native";
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

        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
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
            const brands = await apiGetBrands(text, token);
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

    // ✨ 드롭리스트 노출
    const handleVisibleDropList = () => {
        setIsSelectingCategory(!isSelectingCategory);
    };

    // ✨ 카테고리 중 하나 선택
    const handleSelectCategoryItemPress = (id) => {
        dispatch(actionsMedicines.selectCategory(categoryData, id));
    };

    // ✨ 브랜드명 입력 시 자동검색
    const handleBrandInputWrite = (text) => {
        dispatch(actionsMedicines.searchBrand(text, debounceSearchBrand));
    };

    // ✨드롭리스트에서 브랜드 선택
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

    // ✨ 드롭리스트에서 영양제 선택
    const handleMedicineInputWrite = (text) => {
        dispatch(actionsMedicines.searchMedicine(text, debounceSearchMedicine));
    };

    // ✨드롭리스트에서 브랜드 선택
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

    // ✨ 영양제 등록하기
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

    // ✨ 영양제 신규등록 화면으로 이동
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
                                <StyledTitle>브랜드 이름</StyledTitle>
                                <Input
                                    containerStyle={{
                                        marginBottom: 0,
                                    }}
                                    value={brand}
                                    onBlur={() => {}}
                                    onChangeText={(text) =>
                                        handleBrandInputWrite(text)
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
                                <StyledTitle>영양제 이름</StyledTitle>
                                <Input
                                    containerStyle={{
                                        marginBottom: 0,
                                    }}
                                    value={medicine}
                                    onBlur={() => {}}
                                    onChangeText={(text) =>
                                        handleMedicineInputWrite(text)
                                    }
                                    placeholder="약 이름을 입력해주세요"
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
                                onPress={handleAddMedicineButtonPress}
                            />
                            <ButtonFloating
                                btnWrapStyle={{
                                    position: "absolute",
                                    top: 628,
                                    left: 0,
                                }}
                                title="영양제 추가"
                                onPress={handleSaveButtonPress}
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
                                onPress={handleAddMedicineButtonPress}
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
                            onPress={handleSaveButtonPress}
                        />
                    </>
                )}
            </KeyboardAwareScrollView>
        </>
    );
};

export default SearchMedicine;
