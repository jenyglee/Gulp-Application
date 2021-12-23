import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "@components/index";
import {
    BrandsDropList,
    PressDropList,
    ButtonCategorySelect,
} from "@/medicine/components/index";
import { Alert, Dimensions } from "react-native";
import { apiGetBrands, apiGetMedicines } from "@/medicine/api/medicineApi";
import _ from "lodash";
import { addMedicine } from "@/medicine/api/medicineApi";
import { useSelector, useDispatch } from "react-redux";
import { stateMembers } from "stores/members/membersSlice";
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

const fromScreen = "AddMedicine";

const AddMedicine = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const {
        categoryData,
        category,
        brand,
        brandKey,
        categoryKey,
        medicineList,
    } = useSelector(stateMedicines);
    const { token } = useSelector(stateMembers);
    const [filtered, setFiltered] = useState([]);
    const [medicine, setMedicine] = useState("");
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    const [isSearchingBrand, setIsSearchingBrand] = useState(false);
    const [isFocusedBrand, setIsFocusedBrand] = useState(false);
    const refBrand = useRef(null);
    const refMedicine = useRef(null);

    useEffect(() => {
        // 영양제 검색하다가 추가로 온 경우 검색할 때 Input 값이 그대로 들어가있게 한다.
        setMedicine(route.params.medicine || "");
    }, []);

    //✨ brand 검색어 자동완성 노출
    const debounceSearchBrand = _.debounce(async (text) => {
        if (text) {
            setIsSearchingBrand(true);
            const brands = await apiGetBrands(text, token);
            setFiltered(brands ?? []);
        } else {
            setIsSearchingBrand(false);
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

    // ✨ 영양제를 서버에 등록하고 내 알람에 등록
    const handleAddButtonPress = () => {
        dispatch(
            actionsMedicines.addAndSaveMedicine(
                category,
                brand,
                brandKey,
                categoryKey,
                medicine,
                medicineList,
                navigation,
                fromScreen,
                token
            )
        );
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
                    <StyledForm>
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
                        <StyledTitle>브랜드 이름</StyledTitle>
                        <Input
                            ref={refBrand}
                            containerStyle={{
                                marginBottom: 0,
                            }}
                            value={brand}
                            onBlur={() => {}}
                            onChangeText={(text) => handleBrandInputWrite(text)}
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
                                onSelectItem={(id) =>
                                    handleBrandDropListItemPress(id)
                                }
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
                <Button title="등록" onPress={handleAddButtonPress} />
            </KeyboardAwareScrollView>
        </>
    );
};

export default AddMedicine;
