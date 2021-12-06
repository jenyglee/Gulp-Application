import { actionsMedicines } from "./medicinesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { getCategory } from "@/medicine/api/medicineApi";

const actions = {
    // ✨ 약 삭제(medicineStore)
    deleteMedicine: (id, medicineList) => async (dispatch) => {
        try {
            const medicines = await actions.deleteTask(
                id,
                medicineList
            )(dispatch);
            await actions.storeData(medicines)(dispatch);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    // ✨로컬에서 약 가져오기
    getMedicine: () => async (dispatch) => {
        try {
            const loadedData = await AsyncStorage.getItem("medicine");
            dispatch(actionsMedicines.setMedicineList(JSON.parse(loadedData)));
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

    // ✨ 약을 삭제하고 나면 "medicine"로컬에 다시 저장(medicineStore)
    storeData: (item) => async (dispatch) => {
        try {
            await AsyncStorage.setItem("medicine", JSON.stringify(item));
        } catch (error) {
            throw error;
        }
    },

    // ✨ 카테고리 선택
    handleSelectCategory: (categoryData, id) => (dispatch) => {
        categoryData.map((item) => {
            if (item.id === id) {
                dispatch(actionsMedicines.setCategory(item));
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
};

export default actions;
