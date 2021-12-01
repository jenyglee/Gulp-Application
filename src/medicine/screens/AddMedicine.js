import React, { useState, useRef } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "@components/index";
import {
    BrandsDropList,
    PressDropList,
    ButtonCategorySelect,
} from "@/medicine/components/index";
import { Alert, Dimensions } from "react-native";
import { getBrands, getMedicines } from "@/medicine/api/medicineApi";
import _ from "lodash";
import { addMedicine } from "@/medicine/api/medicineApi";
import { useSelector, useDispatch } from "react-redux";
import { stateMedicines } from "stores/medicines/medicinesSlice";
import actionsMedicines from "stores/medicines/medicineActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

const AddMedicine = ({ navigation }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const { categoryData, category, brand, brandKey } =
        useSelector(stateMedicines);
    // const categoryData = [
    //     { id: 0, title: "비타민C" },
    //     { id: 1, title: "비타민B" },
    //     { id: 2, title: "멀티비타민" },
    //     { id: 3, title: "칼슘/마그네슘/비타민D" },
    //     { id: 4, title: "오메가 3" },
    //     { id: 5, title: "프로바이오틱스" },
    //     { id: 6, title: "프로폴리스" },
    //     { id: 7, title: "눈영양루테인" },
    //     { id: 8, title: "쏘팔메토/아연" },
    //     { id: 9, title: "밀크씨슬" },
    //     { id: 10, title: "철분" },
    //     { id: 11, title: "기타" },
    // ];
    const [filtered, setFiltered] = useState([]);
    // const [category, setCategory] = useState({ title: "선택" });
    // const [brand, setBrand] = useState("");
    const [medicine, setMedicine] = useState("");
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    const [isSearchingBrand, setIsSearchingBrand] = useState(false);
    const [isFocusedBrand, setIsFocusedBrand] = useState(false);
    const refBrand = useRef(null);
    const refMedicine = useRef(null);

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
            if (response === 200) {
                navigation.navigate("AddAlarm");
            } else if (response !== 200) {
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

    const handleSelectCategory = (id) => {
        categoryData.map((item) => {
            if (item.id === id) {
                setCategory(item);
                refBrand.current.focus();
                return;
            } else return;
        });
    };

    // ✨ medicine 검색어 자동완성 노출
    const debounceSearchMedicine = _.debounce(async (text) => {
        if (text) {
            setIsSearchingMedicine(true);
            const medicines = await getMedicines({ brandKey, text });
            setFiltered(medicines ?? []);
        } else {
            setIsSearchingMedicine(false);
        }
    }, 300);

    //✨ brand 검색어 자동완성 노출
    const debounceSearchBrand = _.debounce(async (text) => {
        if (text) {
            setIsSearchingBrand(true);
            const brands = await getBrands(text);
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
                    <StyledForm>
                        <StyledTitle>브랜드 이름</StyledTitle>
                        <Input
                            ref={refBrand}
                            containerStyle={{
                                marginBottom: 0,
                            }}
                            value={brand}
                            onBlur={() => {}}
                            // onChangeText={(text) => setBrand(text)}
                            onChangeText={(text) =>
                                dispatch(
                                    actionsMedicines.onSearchBrand(
                                        text,
                                        debounceSearchBrand
                                    )
                                )
                            }
                            placeholder="브랜드를 입력해주세요"
                            onSubmitEditing={() => {
                                // refMedicine.current.focus();
                            }}
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
                            />
                        )}
                    </StyledForm>
                    <StyledForm>
                        <StyledTitle>영양제 이름</StyledTitle>
                        <Input
                            ref={refMedicine}
                            containerStyle={{
                                marginBottom: 0,
                            }}
                            value={medicine}
                            onBlur={() => {}}
                            onChangeText={(text) => setMedicine(text)}
                            placeholder="약 이름을 입력해주세요"
                        />
                    </StyledForm>
                </Container>
                <Button title="등록" onPress={setMedicineData} />
            </KeyboardAwareScrollView>
        </>
    );
};

export default AddMedicine;
