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
    const { categoryData, category, brand, brandKey, medicine } =
        useSelector(stateMedicines);
    const [filtered, setFiltered] = useState([]);
    const [showBrand, setShowBrand] = useState(false);
    const [showMedicine, setShowMedicine] = useState(false);
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    const [isSearchingBrand, setIsSearchingBrand] = useState(false);
    const [isSearchingMedicine, setIsSearchingMedicine] = useState(false);
    const [isFocusedBrand, setIsFocusedBrand] = useState(false);
    const [isFocusedMedicine, setIsFocusedMedicine] = useState(false);

    const opacityBrand = useRef(new Animated.Value(0)).current;
    const opacityMedicine = useRef(new Animated.Value(0)).current;

    // ✨ 첫 진입 시 값 초기화
    useEffect(() => {
        dispatch(actionsMedicines.setMedicine(""));
        dispatch(actionsMedicines.setBrand(""));
        dispatch(actionsMedicines.setCategory({ title: "선택" }));
        setShowBrand(false);
        setShowMedicine(false);
    }, []);

    // ✨ '브랜드 이름' 노출
    useEffect(() => {
        if (category.title !== "선택") {
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

    // ✨ 로컬에 저장하기
    const setMedicine = async () => {
        try {
            // ① 이미 등록된 약인지 확인
            const loadedData = await AsyncStorage.getItem("medicine");
            const medicines = JSON.parse(loadedData);
            let isSameMedicinesArr = medicines
                ? Object.values(medicines).map((item) => {
                      // 브랜드 명이 이미 있는 것 인지 확인 -> 약 이름까지 이미 있는 것 인지 확인
                      if (item.brandName === brand) {
                          if (item.name === medicine) {
                              return false;
                          } else return true;
                      } else return true;
                  })
                : [];
            if (isSameMedicinesArr.includes(false)) {
                Alert.alert("이 약은 이미 등록되어 있습니다.");
                return;
            } else {
                // 영양제 추가 클릭 시 medicine 값을 가져와 api 약이름 조회를 걸고
                // response 값이 []이면 Alert.alert("신규 등록이 필요한 영양제입니다.")
                const medicines = await getMedicines(brandKey, medicine);
                if (medicines[0] !== undefined) {
                    // ② 저장 진행
                    const ID = Date.now();
                    const newMedicine = {
                        [ID]: { id: ID, name: medicine, brandName: brand },
                        // name: medicine,
                        // brand: { id: brandKey },
                        // category: { id: category.id },
                    };
                    await AsyncStorage.setItem(
                        "medicine",
                        JSON.stringify({ ...medicines, ...newMedicine })
                    );
                    navigation.navigate("AddAlarm");
                } else {
                    Alert.alert(
                        "신규 등록이 필요한 영양제입니다. 신규 등록 화면으로 이동합니다."
                    );
                    navigation.navigate("AddMedicine", {
                        medicine,
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    // ✨ medicine 검색어 자동완성 노출
    const debounceSearchMedicine = _.debounce(async (text) => {
        if (text) {
            setIsSearchingMedicine(true);
            const medicines = await getMedicines(brandKey, text);
            setFiltered(medicines ?? []);
        } else {
            setIsSearchingMedicine(false);
        }
    }, 300);

    //✨ brand 검색어 자동완성 노출
    const debounceSearchBrand = _.debounce(async (text) => {
        if (text) {
            const brands = await getBrands(text);
            brands ? setIsSearchingBrand(true) : setIsSearchingBrand(false);
            setFiltered(brands ?? []);
        } else {
            setIsSearchingBrand(false);
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
                            value={category.title}
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
                                            // console.log(id);
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
                                onPress={setMedicine}
                            />
                        </>
                    ) : null}
                </Container>
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
                        <Button title="영양제 추가" onPress={setMedicine} />
                    </>
                )}
            </KeyboardAwareScrollView>
        </>
    );
};

export default SearchMedicine;
