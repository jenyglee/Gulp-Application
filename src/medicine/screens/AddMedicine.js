import React, { useState } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "@components/index";
import { SearchDropList } from "@/medicine/components/index";
import { Alert } from "react-native";
import { debounce } from "lodash";
import { addMedicine } from "@/medicine/api/medicineApi";

const Container = styled.View`
    width: 100%;
    height: 100%;
`;

const AddMedicine = ({ navigation }) => {
    const tempData = [
        { id: 0, name: "플래티넘 메가비타민c 3000", brand: "렛츠미" },
        { id: 1, name: "고려은단 메가도스C 3000 3g", brand: "고려은단" },
        { id: 2, name: "비타민C 골드플러스 파워업", brand: "고려은단" },
        { id: 3, name: "비타민C 1000", brand: "고려은단" },
        { id: 4, name: "비타민C 1000mg", brand: "종근당" },
    ];
    const [filtered, setFiltered] = useState(tempData);
    const [medicine, setMedicine] = useState("");
    const [brand, setBrand] = useState("");
    const [searchingMedicine, setSearchingMedicine] = useState(false);
    const [searchingBrand, setSearchingBrand] = useState(false);

    // ✨ 로컬에 저장하기
    const getMedicineData = async () => {
        try {
            // ① 이미 등록된 약인지 확인
            const loadedData = await AsyncStorage.getItem("medicine");
            const Item = JSON.parse(loadedData);
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
            const newMedicineServer = {
                name: medicine,
                brand: brand,
                imgPath: "",
                category: "기타",
            };
            await addMedicine(newMedicineServer);

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
            setSearchingMedicine(true);
            const filteredMedicine = tempData.filter((item) => {
                if (item.name.match(text)) {
                    return item.name;
                }
            });
            setFiltered(filteredMedicine);
        } else {
            setSearchingMedicine(false);
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
            setSearchingBrand(true);
            const filteredMedicine = tempData.filter((item) => {
                if (item.brand.match(text)) {
                    return item.brand;
                }
            });
            setFiltered(filteredMedicine);
        } else {
            setSearchingBrand(false);
        }
    }, 300);

    // ✨ 항목에 있는 약을 인풋에 입력
    const selectMedicine = (id) => {
        // console.log(id);
        // filtered.map((item) => {
        //     if (item.id === id) {
        //         setMedicine(item.name);
        //         return;
        //     } else return;
        // });
    };

    // ✨ 항목에 있는 브랜드를 인풋에 입력
    const selectBrand = (id) => {
        // console.log(id);
        // filtered.map((item) => {
        //     if (item.id === id) {
        //         setMedicine(item.brand);
        //         return;
        //     } else return;
        // });
    };

    // ✨
    // const passSameMedicine = () => {
    //     // 목표 : 같은 이름의 값을 삭제하기
    //     //  도출된 오브젝트들을 배열에 넣고 돌려서 같은 값이 있으면 삭제해서 저장
    //     // 이중 반복문.
    //     filtered.map((item) => {
    //         const currElem = item.name;
    //         console.log(currElem);
    //     });
    // };

    return (
        <Container>
            <Input
                value={medicine}
                onBlur={() => {}}
                onChangeText={(text) => onSearchMedicine(text)}
                placeholder="약 입력"
            />
            {searchingMedicine && (
                <SearchDropList
                    filtered={filtered}
                    selectItem={selectMedicine}
                    searchType="name"
                />
            )}
            <Input
                value={brand}
                onBlur={() => {}}
                onChangeText={(text) => onSearchBrand(text)}
                placeholder="브랜드 입력"
            />
            {searchingBrand && (
                <SearchDropList
                    filtered={filtered}
                    selectItem={selectBrand}
                    searchType="brand"
                />
            )}
            <Button title="저장" onPress={getMedicineData} />
        </Container>
    );
};

export default AddMedicine;
