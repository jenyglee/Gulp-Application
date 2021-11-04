import React, { useState } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Input } from "@components/index";
import {
    SearchDropList,
    PressDropList,
    ButtonCategorySelect,
} from "@/medicine/components/index";
import { Alert, Dimensions } from "react-native";
import { debounce } from "lodash";
import { addMedicine } from "@/medicine/api/medicineApi";

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

const AddMedicine = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const tempData = [
        { id: 0, name: "플래티넘 메가비타민c 3000", brand: "렛츠미" },
        { id: 1, name: "고려은단 메가도스C 3000 3g", brand: "고려은단" },
        { id: 2, name: "비타민C 골드플러스 파워업", brand: "고려은단" },
        { id: 3, name: "비타민C 1000", brand: "고려은단" },
        { id: 4, name: "비타민C 1000mg", brand: "종근당" },
    ];
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
    ];
    const [filtered, setFiltered] = useState(tempData);
    const [category, setCategory] = useState("선택");
    const [medicine, setMedicine] = useState("");
    const [brand, setBrand] = useState("");
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    const [isSearchingBrand, setIsSearchingBrand] = useState(false);
    const [isSearchingMedicine, setIsSearchingMedicine] = useState(false);

    // ✨ 로컬에 저장하기
    const getMedicineData = async () => {
        try {
            // // ① 이미 등록된 약인지 확인
            const loadedData = await AsyncStorage.getItem("medicine");
            const Item = JSON.parse(loadedData);
            // // 🍎 값이 있을 경우 알럿 뜨게 하기(이건 api에서도 또 체크해야함.)
            // let duplicate = Object.values(Item).some((v) => {
            //     const sameBrand = () => {
            //         if (v.brand === brand) {
            //             return true;
            //         } else return false;
            //     };
            //     const sameMedicine = () => {
            //         if (v.name === medicine) {
            //             return true;
            //         } else return false;
            //     };
            //     //
            //     sameBrand && sameMedicine;
            // });
            // if (duplicate) {
            //     // 🪲알럿이 안뜸
            //     Alert.alert("이 약은 이미 등록되어 있습니다.");
            //     return;
            // }

            // ② 저장 진행
            // const newMedicineServer = {
            //     name: name,
            //     // brand: brand,
            //     brand: { id: 1 },
            //     // category: "기타",
            //     category: { id: 1 },
            // };
            
            // await addMedicine(newMedicineServer);

            // 👇 api가 에러떠서 버리고 일단 이걸로 저장진행
            const ID = Date.now();
            const newMedicine = {
                [ID]: { id: ID, name: medicine, brand: 1 },
            };
            await AsyncStorage.setItem("medicine", JSON.stringify({ ...Item, ...newMedicine }));
            navigation.navigate("AddAlarm");
            } catch (e) {
                console.log(e);
            }
    };

    // ✨ medicine 검색창에 입력
    const onSearchMedicine = (text) => {
        setMedicine(text);
        debounceSearchMedicine(text);
    };
    // ✨ medicine 검색어 자동완성 노출
    const debounceSearchMedicine = debounce((text) => {
        if (text) {
            setIsSearchingMedicine(true);
            const filteredMedicine = tempData.filter((item) => {
                if (item.name.match(text)) {
                    return item.name;
                }
            });
            setFiltered(filteredMedicine);
        } else {
            setIsSearchingMedicine(false);
        }
    }, 300);

    // ✨ brand 검색창에 입력
    const onSearchBrand = (text) => {
        setBrand(text);
        debounceSearchBrand(text);
    };

    //✨ brand 검색어 자동완성 노출
    const debounceSearchBrand = debounce((text) => {
        if (text) {
            setIsSearchingBrand(true);
            const filteredMedicine = tempData.filter((item) => {
                if (item.brand.match(text)) {
                    return item.brand;
                }
            });
            setFiltered(filteredMedicine);
        } else {
            setIsSearchingBrand(false);
        }
    }, 300);

    const handleSelectCategory = (id) => {
        categoryData.map((item) => {
            if (item.id === id) {
                setCategory(item.title);
                return;
            } else return;
        });
    };

    // ✨ 항목에 있는 약을 인풋에 입력
    const handleSelectMedicine = (id) => {
        filtered.map((item) => {
            if (item.id === id) {
                setMedicine(item.name);
                return;
            } else return;
        });
    };

    // ✨ 항목에 있는 브랜드를 인풋에 입력
    const handleSelectBrand = (id) => {
        // console.log(id);
        filtered.map((item) => {
            if (item.id === id) {
                setBrand(item.brand);
                return;
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
                            value={category}
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
                    <StyledForm>
                        <StyledTitle>브랜드 이름</StyledTitle>
                        <Input
                            containerStyle={{
                                marginBottom: 0,
                            }}
                            value={brand}
                            onBlur={() => {}}
                            onChangeText={(text) => onSearchBrand(text)}
                            placeholder="브랜드를 입력해주세요"
                        />
                        {isSearchingBrand && (
                            <SearchDropList
                                filtered={filtered}
                                onSelectItem={handleSelectBrand}
                                searchType="brand"
                            />
                        )}
                    </StyledForm>
                    <StyledForm>
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
                            <SearchDropList
                                filtered={filtered}
                                onSelectItem={handleSelectMedicine}
                                searchType="name"
                            />
                        )}
                    </StyledForm>
                </Container>
            </KeyboardAwareScrollView>
            <Button title="저장" onPress={getMedicineData} />
        </>
    );
};

export default AddMedicine;
