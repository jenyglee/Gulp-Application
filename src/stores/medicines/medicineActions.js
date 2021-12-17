import { actionsMedicines } from "./medicinesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {
    getCategory,
    getMedicines,
    apiAddMedicine,
} from "@/medicine/api/medicineApi";
import { stateAlarms } from "stores/alarms/alarmsSlice.js";
import actionsAlarms from "stores/alarms/alarmsActions.js";

const actions = {
    // ✨ 약 저장 'api 적용'
    addAndSaveMedicine:
        (
            category,
            brand,
            brandKey,
            categoryKey,
            medicine,
            medicineList,
            navigation,
            fromScreen,
            token
        ) =>
        async (dispatch) => {
            try {
                // ① 값이 모두 있는지 확인
                const confirm = await actions.confirmValue(
                    category.name,
                    brand,
                    medicine
                )(dispatch);

                if (confirm) {
                    // ② 이미 등록된 약인지 확인
                    const isSameMedicinesArr =
                        await actions.confirmSameMedicine(
                            brand,
                            medicine,
                            medicineList
                        )(dispatch);
                    if (isSameMedicinesArr.includes(false)) {
                        Alert.alert("이 약은 이미 등록되어 있습니다.");
                        return;
                    } else {
                        const response = await apiAddMedicine(
                            {
                                name: medicine,
                                brandId: brandKey,
                                categoryId: categoryKey,
                            },
                            token
                        );
                        if (response.status === 200) {
                            // ② 저장 진행
                            actions.setMedicineList([
                                ...medicineList,
                                {
                                    name: medicine,
                                    brandName: brand,
                                    id: response.data,
                                },
                            ])(dispatch);
                            navigation.navigate("AddAlarm", { fromScreen });
                        }
                    }
                } else {
                    Alert.alert("전부 입력되었는지 확인해주세요.");
                }
            } catch (error) {
                console.log(JSON.stringify(error));
            }
        },

    // ✨ 약 저장 'Storage 전용' (medicineStore)
    saveMedicine:
        (
            category,
            brand,
            brandKey,
            categoryKey,
            medicine,
            medicineList,
            navigation,
            fromScreen
        ) =>
        async (dispatch) => {
            try {
                // ① 값이 모두 있는지 확인
                const confirm = actions.confirmValue(
                    category.name,
                    brand,
                    medicine
                )(dispatch);
                if (confirm) {
                    // ② 이미 등록된 약인지 확인
                    const isSameMedicinesArr =
                        await actions.confirmSameMedicine(
                            brand,
                            medicine,
                            medicineList
                        )(dispatch);
                    if (isSameMedicinesArr.includes(false)) {
                        Alert.alert("이 약은 이미 등록되어 있습니다.");
                        return;
                    } else {
                        const response = await getMedicines({
                            categoryKey,
                            brandKey,
                            medicine,
                        });
                        // ③ 약이 하나라도 있는 지 확인
                        if (response[0]) {
                            // ④약 조회했을 때 여러개 나온 것 중 '이름이 일치할 때' 저장 진행
                            response.map((medicineObj) => {
                                if (medicineObj.name === medicine) {
                                    actions.setMedicineList([
                                        ...medicineList,
                                        {
                                            name: medicine,
                                            brandName: brand,
                                            id: medicineObj.id,
                                        },
                                    ])(dispatch);
                                    navigation.navigate("AddAlarm", {
                                        fromScreen,
                                    });
                                }
                            });
                        } else {
                            Alert.alert(
                                "신규 등록이 필요한 영양제입니다. 신규 등록 화면으로 이동합니다."
                            );
                            navigation.navigate("AddMedicine", {
                                medicine,
                            });
                        }
                    }
                } else {
                    Alert.alert("전부 입력되었는지 확인해주세요.");
                }
            } catch (error) {
                console.log(JSON.stringify(error));
            }
        },

    // ✨ 빈칸검수(medicineStore)
    confirmValue: (category, brand, medicine) => (dispatch) => {
        if (category !== "선택") {
            if (brand !== "") {
                if (medicine !== "") {
                    return true;
                } else return false;
            } else return false;
        } else return false;
    },

    // ✨ 이미 등록된 약인지 검수 (medicineStore)
    confirmSameMedicine:
        (brand, medicine, medicineList) => async (dispatch) => {
            let isSameMedicinesArr = medicineList
                ? Object.values(medicineList).map((medicineObj) => {
                      // 브랜드 명이 이미 있는 것 인지 확인 -> 약 이름까지 이미 있는 것 인지 확인
                      if (medicineObj.brandName === brand) {
                          if (medicineObj.name === medicine) {
                              return false;
                          } else return true;
                      } else return true;
                  })
                : [true];
            return isSameMedicinesArr;
        },

    // ✨ 약 삭제(medicineStore)
    deleteMedicine: (id, medicineList) => async (dispatch) => {
        try {
            const deletedMedicineList = medicineList.filter(
                (medicine) => medicine.id !== id
            );
            actions.setMedicineList(deletedMedicineList)(dispatch);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    // ✨ 모든 값 삭제(medicineStore)
    deleteAllValue: (payload) => async (dispatch) => {
        try {
            dispatch(actionsMedicines.setMedicineList([]));
            dispatch(actionsAlarms.setTime("")); // 🪲두번째에 작동됨.
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    // ✨로컬에서 약 가져오기
    getMedicine: () => async (dispatch) => {
        try {
            // const loadedData = await AsyncStorage.getItem("medicine");
            // dispatch(actionsMedicines.setMedicineList(JSON.parse(loadedData)));
        } catch (error) {
            throw JSON.stringify(error);
        }
    },

    // ✨ 약 삭제(medicineStore)
    deleteTask: (id, medicineList) => async (dispatch) => {
        const copy = Object.assign({}, medicineList);
        delete copy[id];
        dispatch(actionsMedicines.setMedicineList(copy));
        return copy;
    },

    // ✨ 카테고리 선택
    handleSelectCategory: (categoryData, id) => (dispatch) => {
        categoryData.map((item) => {
            if (item.id === id) {
                dispatch(actionsMedicines.setCategory(item));
                dispatch(actionsMedicines.setCategoryKey(item.id));
                return;
            } else return;
        });
    },

    // ✨ brand 검색창에 입력
    onSearchBrand: (text, debounceSearchBrand) => (dispatch) => {
        // setBrand(text);
        dispatch(actionsMedicines.setBrand(text));
        debounceSearchBrand(text);
    },

    // ✨ medicine 검색창에 입력
    onSearchMedicine: (text, debounceSearchMedicine) => (dispatch) => {
        dispatch(actionsMedicines.setMedicine(text));
        // setMedicine(text);
        debounceSearchMedicine(text);
    },

    // ✨ 항목에 있는 브랜드를 인풋에 입력
    handleSelectBrand:
        (id, filtered, setIsSearchingBrand, setFiltered) => (dispatch) => {
            filtered.map((item) => {
                if (item.id === id) {
                    dispatch(actionsMedicines.setBrand(item.name));
                    dispatch(actionsMedicines.setBrandKey(item.id));
                    setIsSearchingBrand(false);
                    setFiltered([]);
                } else return;
            });
        },

    // ✨ 항목에 있는 약을 인풋에 입력
    handleSelectMedicine:
        (id, filtered, setIsSearchingMedicine, setFiltered) => (dispatch) => {
            filtered.map((item) => {
                if (item.id === id) {
                    dispatch(actionsMedicines.setMedicine(item.name));
                    setIsSearchingMedicine(false);
                    setFiltered([]);
                } else return;
            });
        },

    // ✨ 카테고리 조회
    setCategoryData: (token) => async (dispatch) => {
        try {
            const response = await getCategory(token);
            dispatch(actionsMedicines.setCategoryData(response.data));
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    setCategory: (payload) => (dispatch) => {
        dispatch(actionsMedicines.setCategory(payload));
    },
    setBrand: (payload) => (dispatch) => {
        dispatch(actionsMedicines.setBrand(payload));
    },
    setMedicine: (payload) => (dispatch) => {
        dispatch(actionsMedicines.setMedicine(payload));
    },
    setMedicineList: (payload) => (dispatch) => {
        dispatch(actionsMedicines.setMedicineList(payload));
    },
};

export default actions;
