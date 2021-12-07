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
import { getBrands, getMedicines } from "@/medicine/api/medicineApi";
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

const AddMedicine = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const width = Dimensions.get("window").width;
    const { categoryData, category, brand, brandKey } =
        useSelector(stateMedicines);
    const { token } = useSelector(stateMembers);
    const [filtered, setFiltered] = useState([]);
    const [medicine, setMedicine] = useState("");
    const [isFocusedCategory, setIsFocusedCategory] = useState(false);
    const [isSelectingCategory, setIsSelectingCategory] = useState(false);
    const [isSearchingBrand, setIsSearchingBrand] = useState(false);
    const [isFocusedBrand, setIsFocusedBrand] = useState(false);
    const refBrand = useRef(null);
    const refMedicine = useRef(null);
    const fromScreen = "AddMedicine";

    useEffect(() => {
        setMedicine(route.params.medicine || "");
    }, []);

    const handleSelectCategory = (id) => {
        console.log(id);
        categoryData.map((item) => {
            if (item.id === id) {
                dispatch(actionsMedicines.setCategory(item));
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
            const brands = await getBrands(text, token);
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
                            value={category.name}
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
                <Button
                    title="등록"
                    onPress={() => {
                        dispatch(
                            actionsMedicines.saveMedicine(
                                category,
                                brand,
                                brandKey,
                                medicine,
                                navigation,
                                fromScreen,
                                token
                            )
                        );
                    }}
                />
            </KeyboardAwareScrollView>
        </>
    );
};

export default AddMedicine;
