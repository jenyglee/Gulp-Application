import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input, TextButton } from "@components/index";
import {
    BrandsDropList,
    MedicinesDropList,
    PressDropList,
    ButtonCategorySelect,
} from "@/medicine/components/index";
import { Alert, Animated, Dimensions } from "react-native";
import _ from "lodash";
import { addMedicine, getBrands, getMedicines } from "@/medicine/api/medicineApi";
import { useSelector, useDispatch } from "react-redux";
import { stateMedicines } from "stores/medicines/medicinesSlice";
import actionsMedicines from "stores/medicines/medicineActions";

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    height: 100%;
    margin-top: 50px;
    align-self: center;
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
`

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({theme})=> theme.line};
`

const SearchMedicine = ({ navigation }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const { categoryData, category, brand, brandKey, medicine } = useSelector(stateMedicines)
    const [filtered, setFiltered] = useState([]);
    const [showBrand, setShowBrand] = useState(false)
    const [showMedicine, setShowMedicine] = useState(false)
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    const [isSearchingBrand, setIsSearchingBrand] = useState(false);
    const [isSearchingMedicine, setIsSearchingMedicine] = useState(false);

    const opacityBrand = useRef(new Animated.Value(0)).current;
    const opacityMedicine = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        if (category.title !== "선택") {
            setShowBrand(true);
            inputAnimation(opacityBrand);
        }
    }, [category])

    // ✨ 브랜드 확인
    useEffect(()=>{
        if (brandKey !== "") {
            setShowMedicine(true);
            inputAnimation(opacityMedicine);
        }
    }, [brandKey])

     // ✨ 애니메이션 'opacity'
     const inputAnimation = (opacityItem) => {
        Animated.timing(opacityItem, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    // ✨ 로컬에 저장하기
    const setMedicineData = async () => {
        try {
            // // ① 이미 등록된 약인지 확인
            const loadedData = await AsyncStorage.getItem("medicine");
            const Item = JSON.parse(loadedData);
            // 🍎 값이 있을 경우 알럿 뜨게 하기(이건 api에서도 또 체크해야함.)
            let duplicate = Object.values(Item).some((v) => {
                const sameBrand = () => {
                    if (v.brand === brand) {
                        return true;
                    } else return false;
                };
                const sameMedicine = () => {
                    if (v.name === medicine) {
                        return true;
                    } else return false;
                };
                //
                sameBrand && sameMedicine;
            });
            if (duplicate) {
                // 🪲알럿이 안뜸
                Alert.alert("이 약은 이미 등록되어 있습니다.");
                return;
            }

            // ② 저장 진행
            const newMedicine = {
                name: medicine,
                brand: { id: brandKey },
                category: { id: category.id },
            };
            
            const response = await addMedicine(newMedicine);
            if(response === 200){
                navigation.navigate("AddAlarm");
            } else if (response !== 200){
                // 🍎 무조건 200 뜨므로 여기서 걸러내면 안됨!!!🍎
                // Alert.alert("이 약은 이미 등록되어 있습니다.")
            }

            // 👇 api가 에러떠서 버리고 일단 이걸로 저장진행
            // const ID = Date.now();
            // const newMedicine = {
            //     [ID]: { id: ID, name: medicine, brand: 1 },
            // };
            // await AsyncStorage.setItem("medicine", JSON.stringify({ ...Item, ...newMedicine }));
            // navigation.navigate("AddAlarm");
            } catch (e) {
                console.log(e);
            }
    };

    // ✨ medicine 검색어 자동완성 노출
    const debounceSearchMedicine = _.debounce( async (text) => {
        if (text) {
            setIsSearchingMedicine(true);
            const medicines = await getMedicines({brandKey, text});
            setFiltered(medicines ?? []);
        } else {
            setIsSearchingMedicine(false);
        }
    }, 300);

    //✨ brand 검색어 자동완성 노출
    const debounceSearchBrand = _.debounce( async (text) => {
        if (text) {
            setIsSearchingBrand(true);
            const brands = await getBrands(text)
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
                contentContainerStyle={{
                    flex: 1,
                }}
                extraScrollHeight={20}
            >
                <Container width={width}>
                    <StyledForm>
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
                                onSelectItem={(id)=>{
                                    dispatch(actionsMedicines.handleSelectCategory(categoryData, id))
                                }}
                                onVisibleDropList={handleVisibleDropList}
                                categoryData={categoryData}
                                isFocused={isFocusedCategory}
                                setIsFocused={setIsFocusedCategory}
                            />
                        )}
                    </StyledForm>
                    { showBrand ? 
                        <Animated.View style={{
                            width: "100%",
                            opacity: opacityBrand,
                            marginBottom: 36,
                        }}>
                            <StyledTitle>브랜드 이름</StyledTitle>
                            <Input
                                containerStyle={{
                                    marginBottom: 0,
                                }}
                                value={brand}
                                onBlur={() => {}}
                                onChangeText={(text) => 
                                    dispatch(actionsMedicines.onSearchBrand(text, debounceSearchBrand))
                                }
                                placeholder="브랜드를 입력해주세요"
                                onSubmitEditing={() => {
                                    confirmBrand();
                                }}
                            />
                            {isSearchingBrand && (
                                <BrandsDropList
                                    filtered={filtered}
                                    onSelectItem={(id)=>{
                                        dispatch(actionsMedicines.handleSelectBrand(id, filtered, setIsSearchingBrand, setFiltered))
                                    }}
                                />
                            )}
                        </Animated.View> 
                    : null }
                    { showMedicine ? 
                        <Animated.View style={{
                            width: "100%",
                            opacity: opacityMedicine,
                            marginBottom: 36,
                        }}>
                            <StyledTitle>영양제 이름</StyledTitle>
                            <Input
                                containerStyle={{
                                    marginBottom: 0,
                                }}
                                value={medicine}
                                onBlur={() => {}}
                                onChangeText={(text) =>{
                                    dispatch(actionsMedicines.onSearchMedicine(text, debounceSearchMedicine))
                                }}
                                placeholder="약 이름을 입력해주세요"
                            />
                            {isSearchingMedicine && (
                                <MedicinesDropList
                                    filtered={filtered}
                                    onSelectItem={(id)=>{
                                        dispatch(actionsMedicines.handleSelectMedicine(id, filtered, setIsSearchingMedicine))
                                    }}
                                />
                            )}
                        </Animated.View> 
                    : null }
                    
                    
                </Container>
            </KeyboardAwareScrollView>
            <TextButtonContainer>
                <Line />
                <TextButton 
                    onPress={()=>{
                        navigation.navigate("AddMedicine")
                    }}
                    btnStyle={{
                        width: "100%",
                        height: 55,
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: 24
                    }} 
                    title="찾으시는 약이 없으세요?" 
                />
            </TextButtonContainer>
            <Button title="저장" onPress={setMedicineData} />
        </>
    );
};

export default SearchMedicine;
