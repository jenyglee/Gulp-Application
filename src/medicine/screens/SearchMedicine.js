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

const Container = styled.View`
    width: ${({ width }) => width - 48}px;
    height: 100%;
    margin-top: 50px;
    align-self: center;
    /* background-color: red; */
`;

const StyledForm = styled.View`
    width: 100%;
    margin-bottom: 36px;
    /* background-color: green; */
    /* align-items: center; */
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
    const width = Dimensions.get("window").width;
    const categoryData = [
        { id: 0, title: "비타민C" },
        { id: 1, title: "비타민B" },
        { id: 2, title: "멀티비타민" },
        { id: 3, title: "칼슘/마그네슘/비타민D" },
        { id: 4, title: "오메가 3" },
        { id: 5, title: "프로바이오틱스" },
        { id: 6, title: "프로폴리스" },
        { id: 7, title: "눈영양루테인" },
        { id: 8, title: "쏘팔메토/아연" },
        { id: 9, title: "밀크씨슬" },
        { id: 10, title: "철분" },
        { id: 11, title: "기타" },
    ];
    const [filtered, setFiltered] = useState([]);
    const [category, setCategory] = useState({title:"선택"});
    const [showBrand, setShowBrand] = useState(false)
    const [showMedicine, setShowMedicine] = useState(false)
    const [brand, setBrand] = useState("");
    const [medicine, setMedicine] = useState("");
    const [brandKey, setBrandKey] = useState("")
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
    const getMedicineData = async () => {
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

    // ✨ brand 검색창에 입력
    const onSearchBrand = (text) => {
        setBrand(text);
        debounceSearchBrand(text);
    };

    // ✨ medicine 검색창에 입력
    const onSearchMedicine = (text) => {
        setMedicine(text);
        debounceSearchMedicine(text);
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
            // await getBrands(text)
            const brands = await getBrands(text)
            setFiltered(brands ?? []);
        } else {
            setIsSearchingBrand(false);
        }
    }, 300);

    const handleSelectCategory = (id) => {
        categoryData.map((item) => {
            if (item.id === id) {
                setCategory(item);
                return;
            } else return;
        });
    };

    // ✨ 항목에 있는 브랜드를 인풋에 입력
    const handleSelectBrand = (id) => {
        filtered.map((item) => {
            if (item.id === id) {
                setBrand(item.name);
                setBrandKey(item.id)
                setIsSearchingBrand(false)
                setFiltered([])
            } else return;
        });
    };

    // ✨ 항목에 있는 약을 인풋에 입력
    const handleSelectMedicine = (id) => {
        filtered.map((item) => {
            if (item.medicineId === id) {
                setMedicine(item.name);
                setIsSearchingMedicine(false)
            } else return;
        });
    };

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
                                onSelectItem={handleSelectCategory}
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
                                onChangeText={(text) => onSearchBrand(text)}
                                placeholder="브랜드를 입력해주세요"
                                onSubmitEditing={() => {
                                    confirmBrand();
                                }}
                            />
                            {isSearchingBrand && (
                                <BrandsDropList
                                    filtered={filtered}
                                    onSelectItem={handleSelectBrand}
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
                                onChangeText={(text) => onSearchMedicine(text)}
                                placeholder="약 이름을 입력해주세요"
                            />
                            {isSearchingMedicine && (
                                <MedicinesDropList
                                    filtered={filtered}
                                    onSelectItem={handleSelectMedicine}
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
            <Button title="저장" onPress={getMedicineData} />
        </>
    );
};

export default SearchMedicine;
